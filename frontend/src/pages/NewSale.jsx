import React, { useState, useRef, useEffect } from 'react'
import { BlurBgShape, Button, Heading, Input, Table, Alert } from '../components'
import { useSelector } from 'react-redux'

function NewSale() {

  const [inputVal, setInputVal] = useState('')
  const [matchedProducts, setMatchedProducts] = useState([])
  const [cartProducts, setCartProducts] = useState([])
  const [totalBill, setTotalBill] = useState('')
  const [saleQuantity, setSaleQuantity] = useState({})
  const businessId = useSelector(state => state.auth.userData.businessId)
  // const [productToUpdate, setproductToUpdate] = useState({})
  // alerts 
  const [saleAlert, setSaleAlert] = useState(false)
  if (!businessId) {
    console.log('Busness not found :: newSale')
    return
  }


  let timeOutRef = useRef(null) // this is the reference of db timeout
  // Live search on sales terminal 
  const onChangeHandler = async (e) => {
    let query = e.target.value
    setMatchedProducts([])
    setInputVal(query)
    clearTimeout(timeOutRef.current) // clear earlier timout and start a new one if user type again with in 300ms
    // timeOutRef.current = an id return by setTimeout
    timeOutRef.current = setTimeout(async () => {
      // console.log(query)

      const res = await fetch(`/api/pos/live-search/${businessId}/?userQuery=${query}`, {
        credentials: 'include'
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data.message)
      }


      setMatchedProducts(data.matchedProducts)

    }, 300);


  }

  // Add to cart 
  const addToCart = (id, product) => {
    // console.log('and this is whole product id', id)

    const totalStock = product.quantity
    const demandStock = Number(saleQuantity[id]) > 0 ? Number(saleQuantity[id]) : 1  // it will add one product by default in cart 
    if (demandStock > totalStock) return alert("You don't have sufficient stock.") // check if stock is avaiable
    const productToSell = { ...product, quantity: demandStock }


    // adding the product into cart list
    setCartProducts(prev => {
      const exist = prev.find(item => item._id === productToSell._id) // check if exist in cart already
      if (exist) {
        return prev.map(existedProduct => {

          if (existedProduct._id === productToSell._id) {
            const totalQtyToAdd = existedProduct.quantity + productToSell.quantity
            if (totalQtyToAdd > totalStock) {
              alert('Your stock is not enough to do this action.')
              return existedProduct
            }
            return {
              ...existedProduct,
              quantity: totalQtyToAdd
            } // if exist update just its quantity
          }
          return existedProduct
        }
        )
      } else {
        return [...prev, productToSell] // if not exist then add it 
      }
    })

    // reduce quantity realtime when adding product to cart
    // setMatchedProducts(prev => (
    //   prev.map(item => item._id === id ? {...item, quantity: item.quantity - demandStock} : item)
    // ))


  }

  // For making bill automatic
  useEffect(() => {
    // addToCart()
    const bill = cartProducts.reduce((acc, curr) => {
      // fullArr.map(item => item._id === curr_id ? )

      return acc += curr.price * curr.quantity
    }, 0)
    setTotalBill(bill)
  }, [cartProducts])


  // getting info from table 
  const getSaleQuantity = (quantity, id) => {
    setSaleQuantity(prev => ({ ...prev, [id]: Number(quantity) }))
    // console.log('clicked in get sale quantity', quantity)

    // console.log('this is in total bill',totalBill)
  }


  // Complete Sale Handler
  const completeSale = async () => {
    console.log('clicked')

    // shape data to send to backend
    const soldProducts = cartProducts.map(product =>
    (
      {
        id: product._id,
        quantity: product.quantity
      }
    ))

    // console.log(soldProducts)

    const res = await fetch(`/api/pos/sale/${businessId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          soldProducts
        })
    })

    const data = await res.json()
    if (!res.ok) return alert(data.message) // fail alert

    // Show success alert / notification 
    setSaleAlert(true)
    setTimeout(() => {
      setSaleAlert(false)
    }, 1000);

    // now clear the cart products after sale completed
    setCartProducts([])



  }


  return (
    <div
      className='min-h-screen pt-7 text-gray-600 dark:text-gray-200 mx-auto   '
    >
      <BlurBgShape />

      <Alert
        className={`${saleAlert ? 'opacity-100 block translate-y-0' : 'opacity-0 hidden -translate-y-10'}`}
        bgColor='bg-blue-500'
        children='Sale completed and stock updated.'
      />

      <div
        className='flex flex-col md:flex-row'
      >

        {/* Product Section in Table */}
        <div
          className=' mt-13 md:mt-0 md:w-4/6  md:order-1 order-2 felx items-center min-h-screen justify-center'
        >

          <Heading
            className='text-center text-3xl h-11 sm:text-5xl  font-bold  '
          >
            Browse
          </Heading>

          {/* Find Product */}
          <div className="flex items-center max-w-lg mx-auto my-3 sm:t-12">
            <div className="relative w-full">
              <Input
                type='text'
                className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Find a Product"
                required
                autoFocus
                value={inputVal}
                onChange={onChangeHandler}
              />
            </div>
          </div>


          {/* it will not show table if there is no products  */}
          {
            matchedProducts.length > 0 ?
              <Table products={matchedProducts} addToCart={addToCart} getSaleQuantity={getSaleQuantity} className='mt-13 ' salesAction={true} />
              :
              <div></div>
          }

        </div>


        {/* Billing section  */}
        <div
          className=' md:border-l-1 border-b-1  border-gray-500 order-1 md:order-2   md:w-2/6 '
        >
          <Heading
            className='text-center text-3xl h-11 sm:text-4xl  font-bold  '
          >
            Billing
          </Heading>

          <div
            className='flex'
          >

            <Heading
              className='text-left ml-3 text-2xl h-11 sm:text-3xl  font-bold  '
            >
              Total :
            </Heading>
            <h1
              className='text-left ml-3 text-2xl h-11 sm:text-3xl  font-bold  '
            >
              {totalBill}
            </h1>

          </div>

          {/* Print Bill Button */}
          <Button
            children='Complete Sale'
            className='ml-3 px-4 py-2 font-semibold rounded-md cursor-pointer  '
            onClick={completeSale}
            disabled={cartProducts.length === 0 ? true : false}
          />

          {/* cart table */}
          <div className={`relative overflow-x-auto mt-8 sm:rounded-lg w-full  `}>

            <table className="text-sm w-[95%] text-left mb-5 md:mb-0 rtl:text-right text-gray-500 dark:text-gray-400 m-auto ">
              {/* Table heading */}
              <thead className={`text-xs text-blue-700   bg-gray-400 dark:bg-gray-700 dark:text-blue-400 `}>
                <tr>
                  <th scope="col" className="px-3 py-3 text-xl">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3 text-xl">
                    Qty
                  </th>
                  <th scope="col" className="px-3 py-3 text-xl">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3 text-xl">
                    Sub Total
                  </th>
                  <th scope="col" className="px-3 py-3 text-xl">

                  </th>
                </tr>
              </thead>

              {/* Table Data */}

              <tbody>
                {
                  cartProducts.map(product => (

                    <tr
                      key={product._id}
                      className="  border-b bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border-blue-500 hover:bg-gray-200 dark:hover:bg-gray-600 "
                    >
                      <th
                        // scope="row"
                        className="px-6 py-4 font-semibold text-wrap w-12  text-lg  text-blue-600 whitespace-nowrap dark:text-white "
                      >
                        {product.name}
                      </th>
                      <td className="px-6 py-4 text-gray-900 dark:text-gray-100 text-[17px]">{product.quantity}</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-gray-100 text-[17px]">{Number(product.price)}</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-gray-100 text-[17px]">{Number(product.quantity) * Number(product.price)}</td>
                      <td
                        className="px-4 cursor-pointer text-gray-900 dark:text-gray-100 text-[17px] bg-red-500"
                        onClick={() => {
                          // X icon in cart table to remove item from cart
                          const final = cartProducts.filter(item => item._id !== product._id)
                          setCartProducts(final)
                        }}
                      >
                        X
                      </td>
                    </tr>

                  ))
                }
              </tbody>


            </table>

          </div>

        </div>
      </div>




    </div>
  )
}

export default NewSale
