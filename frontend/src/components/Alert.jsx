import React from 'react'

function Alert({
  children,
  className = '',
  bgColor = 'bg-green-500'
}) {
  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2  z-50 ${bgColor} text-white px-6 py-3 rounded shadow-lg transition-all duration-300 ease-out
      ${className}
    `}>
      {children}
  </div>
  )
}

export default Alert
