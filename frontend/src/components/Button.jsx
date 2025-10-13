import React from 'react'

function Button({
  children = 'default', 
  className = '',
  type = 'button',
  ...props
  
}) {

 
  return (
    <button
      className={`${className} bg-gradient-to-r to-emerald-600 from-sky-700 hover:from-emerald-500 hover:to-sky-800  text-white shadow transition`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
