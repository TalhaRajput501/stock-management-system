import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function ProtectedRoutes({
  children,
  allowedRoles = [], 
}) {

  const navigate = useNavigate()
  let userRole;
  userRole = useSelector((state) => state.auth.userData.role)
  if (!userRole) {
    // state was removed on relaod so get data from localstorage which was stored after login
    let user = JSON.parse(sessionStorage.getItem('userInfo'))
    userRole = user?.role
  } 


  useEffect(() => {
    if (!allowedRoles.includes(userRole)) {

      navigate('/account/login')
    }
    console.log(userRole)
  }, [])


  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoutes
