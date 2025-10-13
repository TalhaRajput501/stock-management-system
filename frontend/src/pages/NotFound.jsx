import React from 'react'
import notFound from '../assets/404.png'
import { BlurBgShape } from '../components'

function NotFound() {
  return (

    <>

      <BlurBgShape />

      <div
        className='dark:bg-gray-800 h-screen   bg-gray-300'
      >
        <img src={notFound} className=' h-[78vh] mx-auto' />
        <h1 className="text-4xl font-bold  text-center text-gray-800 dark:text-gray-300">404 - Page Not Found</h1>
        <p className="font-bold text-gray-800 text-center  dark:text-gray-300">The page you’re looking for doesn’t exist or has been moved.</p>

      </div>
    </>
  )
}

export default NotFound
