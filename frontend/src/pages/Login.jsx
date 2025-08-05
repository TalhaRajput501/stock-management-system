import React, { useState } from 'react'
import { BlurBgShape, Input } from '../components'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { setUserData, setIsLoggedIn } from '../features/authSlice.js'
import { useDispatch , useSelector} from 'react-redux'

function Login() {
  const dispatch = useDispatch()
  const { handleSubmit, register, reset } = useForm()
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  const role = useSelector((state) => state.auth.userData.role)

  const handleLogin = async (formData) => {
    // console.log('this is what i give in form', formData)
    try {
      setErrorMsg('')
      const name = formData.name.trim()
      const password = formData.password

      // login for admin and user both
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          password,
        })
      }
      )
      const data = await res.json()

      if (!res.ok) { 
        setErrorMsg(data.message)
        console.log('Actual error is :', data.message)
        return
      }
      // console.log('hogya',data.message)
      // now send user data to redux state
      // localStorage.setItem('userInfo', JSON.stringify(data.user)) 

      sessionStorage.setItem('userInfo', JSON.stringify(data.user))
      dispatch(setUserData(data.user)) 
      dispatch(setIsLoggedIn(true)) 

      // navigate to relate route according to role if everything ok 
      const role = data.user.role
      // console.log('this is role before go to any route',role)
      if(role === 'admin'){
        navigate('/dashboard')
      }else{
        navigate('/my-stock')
      }
    } catch (error) {
      console.log('this is error', error)
    }
    reset() // reset/empty the input fields after submit form 
  }

  return (
    <>
    {/* Top blur background shape */}
    <BlurBgShape />
    <div
      className='bg-gray-300 dark:bg-gray-900 min-h-screen dark:text-white pt-9'
    >
      <form
        onSubmit={handleSubmit(handleLogin)}
        className='px-5'
      >
        <h1
          className='text-3xl mb-3 mx-auto p-2 text-center w-[90%] text-blue-900 font-bold dark:text-white '
        >
          Login
        </h1>

        {
          errorMsg ?
            <p
              className='text-red-500 text-center  block '
            >{errorMsg}</p>
            :
            <p
              className='text-red-500 text-center block '
            >&#8203;</p>
        }

        {/* User name */}
        <div className="flex items-center max-w-lg mx-auto mt-3">
          <div className="relative w-full">
            <Input
              {...register('name', {
                required: true,
              })}
              type='text'
              autoComplete="username"
              className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your username"
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
              autoComplete="current-password"
              className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your password"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-center mt-5">

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg cursor-pointer px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type='submit'
          >
            Login
          </button>
        </div>

      </form>
    </div>
    </>
  )
}

export default Login
