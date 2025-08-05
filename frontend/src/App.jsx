import { Outlet } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import { Header } from './components'  
import { useDispatch } from 'react-redux'
import { setIsLoggedIn, setUserData } from './features/authSlice'



function App() {
 
  const dispatch = useDispatch()
  const [authCheck, setAuthCheck] = useState(false)

  useEffect(() => {
    const userInfo = sessionStorage.getItem('userInfo')  
    if(userInfo){
      dispatch(setIsLoggedIn(true)) 
      dispatch(setUserData(JSON.parse(userInfo)))
      // console.log('i passed this from app', userInfo) 
    }
    setAuthCheck(true)
    // console.log('userInfo', userInfo)

  }, [])


    if(!authCheck) return <div></div> 

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
