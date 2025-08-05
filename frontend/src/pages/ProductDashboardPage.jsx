import React, { useEffect, useState } from 'react'
import { BarGraph } from '../components'
// import { useSelector, useDispatch } from 'react-redux'
import PieChartComponent from '../components/PieChart.jsx'
import { Link } from 'react-router-dom'
import Heading from '../components/Heading.jsx'
// import { setIsMenu } from '../features/dashboardMenuSlice.js' 
import { useSelector } from 'react-redux'


function ProductDashboardPage() {

  

  const [totalProducts, setTotalProducts] = useState({
    inStock: 0,
    outOfStock: 0,
  })
  const [rawStock, setRawStock] = useState([])
  const businessId = useSelector((state) => state.auth.userData.businessId)
  // const businessId = JSON.parse(sessionStorage.getItem('userInfo'))?.businessId

  // products coming from backend
  const [productsByCategory, setProductsByCategory] = useState([])


  useEffect(() => {
    const getStats = async () => {
      // console.log('useeffect starts here')

      try {

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/stats/${businessId}`, {
          credentials: 'include'
        })

        const data = await res.json()
        if (!res.ok) {
          alert(data.message)
          return
        }
        // console.log(data)
        // setting products in state
        setProductsByCategory(data.productsByCategory)

        // console.log(data)

        // Paragraph products counts
        setRawStock(data.stock)
        data.stock.map((item) => {
          if (item._id === 'available') {
            setTotalProducts(prev => ({
              ...prev, inStock: item.count
            }))
          } else if (item._id === 'empty') {
            setTotalProducts(prev => ({
              ...prev, outOfStock: item.count
            }))
          }
        })

        // console.log('useeffect ends here')
      } catch (error) {
        alert(error.message)
      }
    }
    getStats()
  }, [])


  return (
    <div
      className=' mt-4'
    >

      {/* Main coloured heading */}
      <Heading
        className='mb-4 text-3xl flex  justify-center font-extrabold md:text-5xl lg:text-6xl'
      >
        Products Overview
      </Heading>

      {/* Pie chart and guide para for showing product's insights  */}
      <div
        className='mx-auto flex justify-between'
      >

        {/* Pie chart explain paragrph */}
        <div
          className='w-[50%]  px-1 pt-9 rounded-xl '
        >
          <h2 className="text-3xl font-bold mb-3 text-[#1170c4] text-center ">Summary</h2>
          <p className="   text-gray-950  mt-4 px-7 text-justify text-lg font-medium text-pretty dark:text-gray-200 sm:text-xl/8">
            This pie chart visually represents the current stock status of items in your system.
            <span className="  bg-[#0088FE]/30 text-[#1170c4] dark:text-[#99c7f0] font-bold px-2 py-0.5 rounded-md mx-1">
              {Number(totalProducts.inStock) || 0}
            </span>
            of the items are
            <span className="underline  decoration-[#0088FE] text-[#2f65ca] underline-offset-4 mx-1">
              in stock
            </span>
            , while
            <span className="bg-[#cd5050]/30 text-[#eb4e4e] dark:text-[#ffd7d7]  font-bold px-2 py-0.5 rounded-md mx-1">
              {Number(totalProducts.outOfStock) || 0}
            </span>
            are
            <span className="underline decoration-[#cd5050] text-[#cd5050] underline-offset-4 mx-1">
              out of stock
            </span>. This helps you quickly assess inventory availability at a glance.
          </p>

          <div
            className='  flex justify-center mt-5'
          >
            <Link
              to={'/add-product'}
              className={`block py-2 px-3 text-center font-bold bg-blue-500 hover:bg-blue-600  cursor-pointer text-white rounded-sm`}
            >
              Want to add Product
            </Link>
          </div>

        </div>

        {/* Pie chart  */}
        <div
          className='w-[50%]  rounded-xl'
        >
          <h2 className="text-xl font-bold text-[#2b8bdf] mb-3 mt-5 text-center">In stock and out of stock items</h2>

          <PieChartComponent products={rawStock.length !== 0 ? totalProducts : undefined} />

        </div>
      </div>

      {/* Bar Graph for showing product quantity by category */}
      <div
        className='flex items-center w-full justify-center'
      >
        <BarGraph products={productsByCategory.length !== 0 ? productsByCategory : undefined} /> 
      </div>

    </div>
  )
}

export default ProductDashboardPage
