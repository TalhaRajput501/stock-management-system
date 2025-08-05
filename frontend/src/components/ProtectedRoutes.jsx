import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function ProtectedRoutes({
  children,
  allowedRoles = [], 
}) {

  const navigate = useNavigate()  
  let userRole = useSelector((state) => state.auth.userData.role)


  useEffect(() => {
    if (!allowedRoles.includes(userRole)) {
      navigate('/account/login')
    }
    // console.log(userRole)
  }, [])


  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoutes
