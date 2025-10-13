import React, { useEffect, useRef, useState } from 'react'
import { BlurBgShape, Input, Table, Heading, Alert } from '../components'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setFilteredProducts } from '../features/productSlice';
import { nextPage, prevPage } from '../features/pageSlice';
import { setLoading } from '../features/loadingSlice';

function MyStock() {

  const dispatch = useDispatch()

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [idForUpdate, setIdForUpdate] = useState('second');
  const { register, handleSubmit, setValue } = useForm();

  // Products variable and actions
  const products = useSelector((state) => state.product.products)
  const filteredProducts = useSelector((state) => state.product.filteredProducts)
  const loading = useSelector((state) => state.loading.loading)


  const businessId = useSelector((state) => state.auth.userData.businessId)
  const [inputVal, setInputVal] = useState('')

  // Pagination variable
  const page = useSelector((state) => state.page.page)
  const limit = useSelector((state) => state.page.limit)

  // rerun the useEffect after update product
  const [runUseEffect, setRunUseEffect] = useState(true)

  // Fetching all products from database 
  useEffect(() => {
    const getAllProducts = async () => {
      // console.log('effect')
      try {
        dispatch(setLoading(true))
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/inventory/products/${businessId}?limit=${limit}&page=${page}`, {
          credentials: 'include'
        })
        const result = await res.json()
        // setProducts(result)
        // setfilteredProducts(result)
        // update with redux
        dispatch(setProducts(result))
        // dispatch(setFilteredProducts(result))
        dispatch(setLoading(false))
      } catch (error) {
        alert(`${error.message}`)
      }
    }
    getAllProducts()
  }, [page, runUseEffect])

  // Search a Product
  let timeOutRef = useRef(null)
  const handleSearch = async (e) => {
    let query = e.target.value
    setInputVal(query)
    if (query.trim().length === 0) return setRunUseEffect(prev => !prev)
    clearTimeout(timeOutRef.current)

    timeOutRef.current = setTimeout(async () => {

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pos/live-search/${businessId}?userQuery=${query}`, {
        method: 'GET',
        credentials: 'include'
      })

      const data = await res.json()
      // if(!res.ok) return alert(data.message)
      console.log(data.matchedProducts)
      dispatch(setProducts(data.matchedProducts))
    }, 300);

  }


  // Delete a Product from DB and UI
  const handleDelete = async (id) => {
    // console.log('clicked delete', id)
    try {

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/inventory/products/${id}`, {
        method: "DELETE",
        credentials: 'include'
      })
      // terminate the function if res is not okey
      if (!res.ok) {
        const errorData = await res.json()
        alert(`${errorData?.message}`)
        return
      }

      const deletedProduct = products.filter((product) => product._id !== id)
      dispatch(setProducts(deletedProduct))
      // dispatch(setFilteredProducts(deletedProduct))
      const data = await res.json()
      console.log(data.message)
      // alert(`${data.message}`)

      // console.log('Product deleted') 
      // adding and removing alert of product add
      setDeleteAlert(true)
      setTimeout(() => {
        setDeleteAlert(false)
      }, 1000);
    } catch (error) {

      alert(`Can't delete product ${error.message}`)
    }
  }


  // Update a Product

  // Update button in table row 
  // This button is responsible for opening a popup 
  const tableUpdateButton = (id) => {
    // console.log('button clicked in table row and go to state', id)
    setIdForUpdate(id)
    products.map((product) => {
      if (product._id === id) {

        setValue('name', product.name)
        setValue('stock', product.stock)
        setValue('category', product.category)
        setValue('price', product.price)
        setValue('quantity', product.quantity)
        // console.log(product.name, product.stock, product.price, product.quantity,product.category, )
      }
    })
    setShowUpdateForm(true)
    document.body.style.overflow = 'hidden';
  }

  // Submit button in popup / Update Form 
  const handleUpdate = async (data) => {
    // console.log('clicked in update in popup')
    const id = idForUpdate

    // const {name, price, stock, quantity, category} = data 
    const name = data.name.trim()
    const stock = data.stock.trim()
    const category = data.category.trim()
    const price = data.price
    const quantity = data.quantity
    // console.log('This is what i get in data', data)

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/inventory/products/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          stock,
          price,
          quantity,
          category
        })
      })

      let data = await res.json()

      if (!res.ok) {
        alert(`${data.message}`)
        return
      }

      const updatedProduct = await data.updatedProduct
      // seperate produts that which we are not changing
      const restArr = products.filter((item) => item._id !== id)

      products.map((product) => {
        if (product._id === id) {
          // now take the product we want to change and joint them with the rest products
          setProducts([{ ...product, ...updatedProduct }, ...restArr])
          // setFilteredProducts([{...product, ...updatedProduct}, ...restArr])

          setRunUseEffect(prev => !prev)
        }
      })

      // Empty form after update clicked  
      setValue('name', '')
      setValue('stock', '')
      setValue('category', '')
      setValue('price', '')
      setValue('quantity', '')


      setShowUpdateForm(false)
      document.body.style.overflow = 'auto'

      // adding and removing alert of product add
      setUpdateAlert(true)
      setTimeout(() => {
        setUpdateAlert(false)
      }, 1000);

    } catch (error) {

      document.body.style.overflow = 'auto'
      console.log('error in handdleUpdate again', error.message)
    }
  }

  // Cancel button in Update Form / popup
  const handleCancelUpdate = () => {
    // console.log('clicked cancel')
    setShowUpdateForm(false)
    document.body.style.overflow = 'auto'
  }


  // Pagination Logic 
  const handleNextPage = async () => {
    dispatch(nextPage())
  }

  const handlePrevPage = async () => {
    if (page > 1) dispatch(prevPage())
  }

  return (

    <div>
      {/* Top blur background shape */}
      <BlurBgShape />

      <div className="  min-h-screen text-white" id='page'>

        {/* All Poroducts and Product Actions  */}
        <div>
          <Heading
            className='text-4xl mb-5 pt-6 justify-center text-blue-900 dark:text-white font-bold text-center '
          >
            Find Products
          </Heading>

          {/* Confirm Notification of Updation*/}
        <Alert
          className={`${updateAlert ? 'opacity-100 block translate-y-0' : 'opacity-0 hidden -translate-y-10'}`}
          bgColor='bg-blue-500'
          children='Product updated Successfuly!!'
        /> 

          {/* Confirm Notification of Deletion*/}
        <Alert
          className={`${deleteAlert ? 'opacity-100 block translate-y-0' : 'opacity-0 hidden -translate-y-10'}`}
          bgColor='bg-blue-500'
          children='Product deleted Successfuly!!'
        /> 


          {/* Find Product Input */}
          <div className="flex items-center max-w-lg mx-auto px-5">
            <div className="relative w-full">
              <Input
                className="bg-gray-400 outline-none border text-black border-gray-300 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter product name"
                onChange={handleSearch}
                required
                autoFocus
                value={inputVal}
              />
            </div>
          </div>

          {/* Table to show all products */}
          <div>
            <div
              className='w-full  '
            >
              <Heading
                className='text-3xl   -1 mb-1 mx-auto font-bold p-2 text-left w-[90%] '
              >Your stock
              </Heading>
            </div>

            {/* Table of All Stock */}

            <Table
              className='pb-8'
              products={products}
              actions={true}
              deleteProduct={handleDelete}  // delete action
              updateProduct={tableUpdateButton} // update action 
              // loadingMsg={loadingMsg}
              loading={loading}
            />
          </div>

 

          <div className="flex flex-col items-center pb-5"> 
            <div className="inline-flex mt-2 xs:mt-0"> 
              {/* Next Page Button */}
              <button 
                onClick={handlePrevPage}
                className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-700 rounded-s hover:bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                
                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                </svg>
                Prev
              </button>

                {/* Previous Page Button */}
              <button   
                onClick={handleNextPage}
                className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-700 border-0 border-s border-gray-900 rounded-e hover:bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>


      {/* Form for update the Product */}

      {showUpdateForm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 text-white">
          <div className="dark:bg-gray-800 bg-gray-600  sm:w-[60vw] h-[80vh] p-7 rounded-2xl relative overflow-auto border-1 border-dashed border-blue-500">


            <h2 className="text-2xl font-bold mb-5 text-center">Update Product</h2>

            <form>

              {/* Product Name */}
              <div className="flex items-center max-w-lg mx-auto mb-4">
                <div className="relative w-full">
                  <Input
                    className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Product Name"
                    required
                    {...register('name', {
                      required: true
                    })}
                  />
                </div>
              </div>

              {/* Product Price */}
              <div className="flex items-center max-w-lg mx-auto mb-4">
                <div className="relative w-full">
                  <Input
                    className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 [type='number']:-moz-appearance-none"
                    type='number'
                    placeholder="Product Price"
                    required
                    {...register('price', {
                      required: true,
                      valueAsNumber: true
                    })}
                  />
                </div>
              </div>

              {/* Product Quantity */}
              <div className="flex items-center max-w-lg mx-auto mb-4">
                <div className="relative w-full">
                  <Input
                    className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 [type='number']:-moz-appearance-none"
                    placeholder="Product Quantity"
                    required
                    type='number'
                    {...register('quantity', {
                      required: true,
                      valueAsNumber: true
                    })}
                  />
                </div>
              </div>

              {/* Product Category */}
              <div className="flex items-center max-w-lg mx-auto mb-2">
                <div className="relative w-full">
                  <Input
                    className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Product Category"
                    required
                    {...register('category', {
                      required: true
                    })}
                  />
                </div>
              </div>

              {/* Product Stock */}
              <div className="flex items-center max-w-lg mx-auto mb-4">
                <div className="relative w-full">
                  <label
                    htmlFor="stockAvail"
                    className='text-white'
                  >Enter Stock Availability</label>
                  <select
                    id='stockAvail'
                    className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    {...register('stock', {
                      required: true
                    })}
                    defaultValue='available'
                  >
                    <option value="available">Available</option>
                    <option value="empty">Empty</option>
                  </select>

                </div>
              </div>

              {/* Update and Cancel Buttons */}
              <div
                className=' flex items-center justify-center'
              >
                {/* Update Button */}
                <button
                  className="bg-blue-600 hover:bg-blue-800 text-white cursor-pointer px-4 py-2 rounded"
                  onClick={handleSubmit(handleUpdate)}
                >
                  Save Changes
                </button>

                {/* Cancel Button */}
                <button type="button" className="border-blue-600 border-1 cursor-pointer text-white px-4 ml-4 py-2 rounded hover:bg-red-500"
                  onClick={handleCancelUpdate}
                >
                  Cancel
                </button>

              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  )
}

export default MyStock
