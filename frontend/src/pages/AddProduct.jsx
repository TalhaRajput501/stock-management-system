import React, { useState } from 'react'
import { Table, Input, BlurBgShape, Heading, Button } from '../components'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts, setFilteredProducts } from '../features/productSlice'


function AddProduct() {

  const [currentProducts, setCurrentProducts] = useState([])
  const { register, handleSubmit, setValue } = useForm()
  const [addedAlert, setAddedAlert] = useState(false)
  const dispatch = useDispatch()
  const business = useSelector((state) => state.auth.userData.businessId)

  // Add Product to database
  const addProduct = async (data) => {

    // console.log('clicked in addProduct')
    console.log('This is what i give in form', data)
    setAddedAlert('')
    if (isNaN(data.price) || isNaN(data.quantity)) {
      alert('Price and Quantity should be in numbers')
      return
    }
    const name = data.name.trim();
    const stock = data.stock.trim();
    const category = data.category.trim()
    const price = data.price
    const quantity = data.quantity

    const businessId = business || JSON.parse(sessionStorage.getItem('userInfo'))?.businessId
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/inventory/products/${businessId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          stock,
          price,
          quantity,
          category
        })

      })
      const data = await res.json()

      if (!res.ok) {
        alert(`${data.message}`)
        return
      }

      const product = await data.newProduct
      setCurrentProducts((prevProducts) => [{ ...product }, ...prevProducts])
      // console.log('This is what saved in database', products)  

      setValue('name', '')
      setValue('price', '')
      setValue('category', '')
      setValue('quantity', '')


      // Now here make a db call for latest products and sync data 
      
      const latestData = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/inventory/products/${businessId}`)
      const result = await latestData.json()
      // update the state so that i can see data immediately in every component
      dispatch(setProducts(result))
      dispatch(setFilteredProducts(result))


      // adding and removing alert of product add
      setAddedAlert(true)
      setTimeout(() => {
        setAddedAlert(false)
      }, 1000);



    } catch (error) {
      alert(`${error.message}`)
    }
  }

  const dummy = () => {
    // console.log(products)
    setAddedAlert(true)
    setTimeout(() => {
      setAddedAlert(false)
    }, 1000);
  }

  return (


    <>

      {/* <button onClick={dummy}>Dummy Button </button> */}
      {/* Top blur background shape */}
      <BlurBgShape />
    
      <div
        className='pt-4  min-h-screen'
      >

        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-all duration-500 ease-in-out
            ${addedAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
          `}>
          Product Added Successfully!
        </div>

        <form>

          <Heading
            className='text-4xl justify-center font-bold text-blue-900 dark:text-white  text-center mb-5'
          >Add a Product
          </Heading>

          <div
            className='px-5'
          >

            {/* Product name */}
            <div className="flex items-center max-w-lg mx-auto">
              <div className="relative w-full">

                <Input
                  className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Product name"
                  required
                  {...register('name', {
                    required: true
                  })}
                />
              </div>
            </div>

            {/* Product Price */}
            <div className="flex items-center max-w-lg mx-auto mt-2">
              <div className="relative w-full">
                <Input
                  type='number'
                  className="bg-gray-400 border border-gray-300 outline-none text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full   p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 [type='number']:-moz-appearance-none"
                  placeholder="Enter price (numbers only)"
                  required
                  {...register('price', {
                    required: true,
                    valueAsNumber: true
                  })}
                />
              </div>
            </div>

            {/* Product Quantity */}
            <div className="flex items-center max-w-lg mx-auto mt-2">
              <div className="relative w-full">
                <Input
                  type='number'
                  className="bg-gray-400 border border-gray-300 outline-none text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full   p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 [type='number']:-moz-appearance-none "
                  placeholder="Enter Quantity (numbers only)"
                  required
                  {...register('quantity', {
                    required: true,
                    valueAsNumber: true
                  })}
                />
              </div>
            </div>

            {/* Product Category */}
            <div className="flex items-center max-w-lg mx-auto mt-2">
              <div className="relative w-full">
                <Input
                  className="bg-gray-400 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full   p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  placeholder="Product Category"
                  required
                  {...register('category', {
                    required: true
                  })}
                />
              </div>
            </div>

            {/* Product Stock availability */}
            <div className="flex items-center max-w-lg mx-auto mt-2">
              <div className="relative w-full">
                <label
                  htmlFor="stockAvail"
                  className='dark:text-white text-blue-900 font-semibold'
                >Enter Stock Availability</label>
                <select
                  id='stockAvail'
                  className='bg-gray-400 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full   p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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

          </div>

          {/* Add Product Button */}
          <div className="flex items-center justify-center mt-3">

            <Button
              className=" focus:ring-4 focus:ring-blue-300 font-medium  rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:focus:ring-blue-800"
              onClick={handleSubmit(addProduct)}
            >
              Add Product
            </Button>
          </div>

        </form>


        {/* Table to show currently added products */}
        <div>

          <div
            className='w-full  '
          >
            <h1
              className='text-3xl mt-1 mb-1 mx-auto p-2 text-left w-[90%] text-blue-900 font-bold dark:text-white '
            >Currently added Products:
            </h1>
          </div>

          <Table className='pb-4' products={currentProducts} />

        </div>
      </div>
    </>
  )
}
export default AddProduct
