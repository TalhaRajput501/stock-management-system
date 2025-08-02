import React from 'react'
import { Input } from '../components'
import { useForm } from 'react-hook-form'

function RegisterBusiness() {

  const { handleSubmit, register, reset } = useForm()

  const registerBusiness = async (formData) => {
    console.log('this is what i give in form', formData)
    const name = formData.name.trim()
    const email = formData.email.trim()
    const password = formData.password
    const businessName = formData.businessName
    const location = formData.location

    // Request for a business setup
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        businessName,
        location
      })
    }
    )

    if(!res.ok){
      console.log('response is not ok')
      return
    }
    const data = await res.json()
    console.log('nessage from backend:: ', data.message)
    console.log('business which is made in db', data.business)
    console.log('this is user which is made in db', data.user)
    
    reset() // reset/empty the input fields after submit form 
  }

  return (
    <>
    {/* Top blur background shape */}
    
    <div
      className='bg-gray-300 dark:bg-gray-900 min-h-screen dark:text-white pt-9'
    >
      <form
        onSubmit={handleSubmit(registerBusiness)}
        className='px-5'
      >
        <h1
          className='text-3xl mb-3 mx-auto p-2 text-center w-[90%] text-blue-900 font-bold dark:text-white '
        >
          Register your business now
        </h1>

        {/* Business owner Username */}
        <div className="flex items-center max-w-lg mx-auto">
          <div className="relative w-full">
            <Input
              {...register('name', {
                required: true,
              })}
              className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your name (Business owner)"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center max-w-lg mx-auto mt-3">
          <div className="relative w-full">
            <Input
              {...register('email', {
                required: true,
              })}
              type='email'
              className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
        </div>

        {/* Password */}
        {/* i have to add a eye icon on this input for showing password or not  */}
        <div className="flex items-center max-w-lg mx-auto mt-3">
          <div className="relative w-full">
            <Input
              {...register('password', {
                required: true,
              })}
              type='password'
              className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Strong password"
              required
            />
          </div>
        </div>

        {/* Business name */}
        <div className="flex items-center max-w-lg mx-auto mt-3">
          <div className="relative w-full">
            <Input
              {...register('businessName', {
                required: true,
              })}
              className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Business name"
              required
            />
          </div>
        </div>

        {/* Business Location */}
        <div className="flex items-center max-w-lg mx-auto mt-3">
          <div className="relative w-full">
            <Input
              {...register('location', {
                required: true,
              })}
              type='text'
              className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="Business location"
              required
            />
          </div>
        </div>

        {/* Add Product Button */}
        <div className="flex items-center justify-center mt-5">

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg cursor-pointer px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type='submit'
          >
            Register Now
          </button>
        </div>

      </form>
    </div>
    </>
  )
}

export default RegisterBusiness
