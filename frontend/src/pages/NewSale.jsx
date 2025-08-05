import React, { useState, useRef } from 'react'
import { Button, Heading, Input, Table } from '../components'
import { useSelector } from 'react-redux'

function NewSale() {

  const [inputVal, setInputVal] = useState('')
  const businessId = useSelector(state => state.auth.userData.businessId)

  if (!businessId) {
    console.log('Busness not found :: newSale')
    return
  }
  const products = [
    { _id: '1', name: 'product1', quantity: 26, price: 323, stock: 'available', category: 'tab' },
    { _id: '2', name: 'product2', quantity: 13, price: 12, stock: 'available', category: 'mobile' },
    { _id: '3', name: 'product3', quantity: 63, price: 54, stock: 'empty', category: 'pc' },
    { _id: '4', name: 'product4', quantity: 27, price: 31, stock: 'available', category: 'laptop' },
  ]

  let timeOutRef = useRef(null)

  const onChangeHandler = async (e) => {
    setInputVal(e.target.value)
    clearTimeout(timeOutRef.current)

    timeOutRef.current = setTimeout(async () => {
      console.log(e.target.value)

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/inventory/products/${businessId}/?searchReq=${e.target.value}`, {
        credentials: 'include'
      })

      const data = await res.json()
      console.log(data.message)

    }, 3040);


  }



  return (
    <div
      className='min-h-screen pt-7 text-gray-600 dark:text-gray-200 mx-auto     max-w-[97vw]'
    >


      <div
        className='flex'
      >





        {/* This is find and add to cart */}
        <div
          className='  w-3/4 min-h-screen felx items-center justify-center'
        >

          <Heading
            className='text-center text-3xl h-11 sm:text-5xl  font-bold  '
          >
            Browse
          </Heading>

          {/* Find Product */}
          <div className="flex items-center max-w-lg mx-auto my-3 mt-12">
            <div className="relative w-full">
              <Input
                type='text'
                className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your username"
                required
                value={inputVal}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div
            className='flex items-center justify-center '
          >
            <Button
              className='py-2 px-4 rounded-2xl cursor-pointer'
            >
              Submit
            </Button>
          </div>

          <Table products={products} className='mt-13' salesAction={true} />

        </div>


        {/* Billing section  */}
        <div
          className=' border-l-2 border-r-2 border-gray-500  w-1/4 min-h-screen'
        >
          <Heading
            className='text-center text-3xl h-11 sm:text-4xl  font-bold  '
          >
            Total
          </Heading>
        </div>





      </div>












    </div>
  )
}

export default NewSale
