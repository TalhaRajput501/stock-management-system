import React from 'react'

function Heading({
  children,
  className = ''
}) {
  return (
    <h1 className={`  ${className} tracking-tight text-balance text-gray-900 dark:text-white  flex  `}>
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        {children}
      </span>
    </h1>
  )
}

export default Heading
