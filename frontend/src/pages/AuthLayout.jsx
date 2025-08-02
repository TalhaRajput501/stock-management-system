import React from 'react'
import { Link, } from 'react-router-dom'
import profilePic from '../assets/profile.png'

function AuthLayout() {


  return (
    <div
      className='bg-gray-300 dark:bg-gray-900 min-h-screen '
    >
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 pt-5 text-gray-800 dark:text-gray-100">
        Welcome to the Portal
      </h1>


      <div
        className='flex w-full justify-center '
      >

        <Link
          to="register"
          className="bg-gray-400 dark:bg-gray-500 text-gray-900 dark:text-white rounded-xl hover:shadow-xl hover:scale-110 transition-transform duration-300 ease-out  h-52 m-4 text-center w-[43%]"
          
        >
          <div
            className='p-5 flex '
          >
            <img src={profilePic} alt="user sketch" className='size-44 rounded-full '/>
            <h1>
              Register your business
            </h1>
          </div>
        </Link>



        <Link
          to="login"
          className="bg-gray-400 dark:bg-gray-500 text-gray-900 dark:text-white rounded-xl hover:shadow-xl hover:scale-110 transition-transform duration-300 ease-out  h-52 m-4 text-center w-[43%]"
        >
          <div
            className='p-5 flex '
          >
            <img src={profilePic} alt="user sketch" className='size-44 rounded-full '/>
            <h1>
              Login as an employee
            </h1>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default AuthLayout
