import { Outlet } from 'react-router-dom'
import React, {useEffect} from 'react'
import { Header } from './components'
import { useDispatch } from 'react-redux'
import { setProducts, setFilteredProducts } from './features/productSlice'
import { setLoading } from './features/loadingSlice'
import { useSelector } from 'react-redux'
import { nextPage } from './features/pageSlice'


function App() {

  // const dispatch = useDispatch() 
  // const business = useSelector((state) => state.auth.userData.businessId)
  // const businessId = business || JSON.parse(sessionStorage.getItem('userInfo'))?.businessId
  // console.log(businessId)

  // const page = useSelector((state) => state.page.page)
  // const limit = useSelector((state) => state.page.limit)

  // useEffect(() => {
  //   const getAllProducts = async () => {
  //     try {
  //       dispatch(setLoading(true))

  //       const res = await fetch(`http://localhost/api/inventory/products/${businessId}?page=${page}&limit=${limit}`, {
  //         credentials: 'include'
  //       })
  //       const result = await res.json()

  //       if(!res.ok){
  //         alert(`${result.message}`)
  //         return
  //       } 
  //       dispatch(setProducts(result))
  //       dispatch(setFilteredProducts(result)) 
  //       dispatch(setLoading(false))
  //       dispatch(nextPage())
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getAllProducts()
  // }, [])



  return (
    <>
      <Header />
      <div
        className='bg-white dark:bg-gray-900'
      >
        <Outlet />
      </div>
    </>
  )
}

export default App
