import React from 'react'

function Button({
  children = 'default', 
  className = '',
  type = 'button'
}) {

 
  return (
    <button
      className={`${className} bg-gradient-to-r to-emerald-600 from-sky-900 hover:to-emerald-600 hover:from-sky-900 text-white  shadow transition`}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
