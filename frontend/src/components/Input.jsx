import React, { forwardRef } from 'react'

function Input({
    placeholder,
    ...props
}, ref) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder} 
        ref={ref}
        {...props}
      />
    </div>
  )
}

export default forwardRef(Input) 