import React, { useEffect, useState } from 'react'
import profilePic from '../assets/profile.png'
import { Input , Heading} from '../components'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux' 

function MyUsers() {

  const [users, setUsers] = useState([])
  const [userForm, setUserForm] = useState(false)
  // this state is for execut useeffect again for instant ui update
  const [userDelete, setUserDelete] = useState(false)
  const { handleSubmit, register, reset } = useForm()
  const businessId = JSON.parse(sessionStorage.getItem('userInfo'))?.businessId



  useEffect(() => {
    const getAllUsers = async () => {

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/users/${businessId}`, {
        credentials: 'include'
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data.message)
      }
      setUsers(data.allUsers)
      console.log('users data', data.allUsers)

    }
    getAllUsers()
  }, [userForm, userDelete])




  // To show pop up to addd user
  const addUserPannel = () => {
    document.body.style.overflow = 'hidden'
    setUserForm(true)
  }

  // addd user logic
  const addUser = async (data) => {
    try {

      const name = data.name
      const email = data.email
      const password = data.password
      console.log(data)

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/user/${businessId}`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      console.log(res)
      const resData = await res.json()

      if (!res.ok) {
        // show error message
        alert(`${resData.message}`)
        return
      }

      // show success message
      alert(`${resData.message}`)

      // Block scrolling when add User pannel is open
      document.body.style.overflow = 'auto'
      setUserForm(false)
      // now empty the whole form after every thing done and it is important when next time click on add user form should be empty
      reset()

    } catch (error) {
      alert(`${error.message}`)
      console.log(error.message)
    }

  }

  // cancel button in add User pannel
  const cancelAdd = () => {
    setUserForm(false)
    document.body.style.overflow = 'auto'
  }

  // Delete a user
  const deleteUser = async ( deleteId ) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/user/${deleteId}`, {
      credentials: 'include', 
      method: 'DELETE'
    })

    const data = await res.json()
    if(!res.ok){
      alert(`${data.messsage}`)
    }

    alert(`${data.message}`)
    setUserDelete(prev => !prev)

  }

  return (
    <div
      className='min-h-screen  mt-4 flex flex-col  '
    >

      {/* Main coloured heading */}
      <Heading
        className='mb-4 text-3xl flex h-18 justify-center font-extrabold md:text-5xl lg:text-6xl'
        >
        Manage Your Staff

      </Heading>

      <div className="flex flex-wrap justify-center gap-6 px-4 py-6">
        {users.length !== 0 &&
          users.map((user, index) => (
            <div
              key={`${user.role}-${index}`}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 w-full sm:w-[48%] lg:w-[40%] max-w-sm overflow-hidden"
            >
              <div className="p-4 flex flex-col items-center text-center space-y-4">
                <img
                  src={profilePic}
                  alt="user"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                />
                {/* User Details*/}
                <div>
                  <h1 className="text-xl font-semibold">{user.name}</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className='font-bold text-gray-600 dark:text-gray-200'>Role:</span> {user.role}
                  </p> 
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className='font-bold text-gray-600 dark:text-gray-200'>E-mail:</span> {user.email}
                  </p> 
                </div>
                {/* User Actions */}
                <div className="flex gap-4">
                  {/* <button className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">
                    Rename
                  </button> */}
                  <button 
                    className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>



      {
        userForm && (

          <div className=" fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 text-white">
            <div className="dark:bg-gray-800 bg-gray-600  sm:w-[60vw]   p-7 rounded-2xl relative overflow-auto border-1 border-dashed border-blue-500">

              {/* Pop up form of add user */}
              <h2 className="text-2xl font-bold mb-5 text-center">Add User</h2>
              <form
                onSubmit={handleSubmit(addUser)}
              >

                {/* User's Name */}
                <div className="flex items-center max-w-lg mx-auto mb-4">
                  <div className="relative w-full">
                    <Input
                      className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="User's Name"
                      required
                      {...register('name', {
                        required: true
                      })}
                    />
                  </div>
                </div>


                {/* User E-mail */}
                <div className="flex items-center max-w-lg mx-auto mb-4">
                  <div className="relative w-full">
                    <Input
                      className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="User's e-mail"
                      required
                      {...register('email', {
                        required: true
                      })}
                    />
                  </div>
                </div>


                {/* User Password */}
                <div className="flex items-center max-w-lg mx-auto mb-2">
                  <div className="relative w-full">
                    <Input
                      className="bg-gray-400 border border-gray-300 outline-none text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="User's password"
                      type='password'
                      required
                      {...register('password', {
                        required: true
                      })}
                    />
                  </div>
                </div>


                {/* Add User or Cancel Buttons */}
                <div
                  className='mt-4 flex items-center justify-center'
                >
                  {/* Add user */}
                  <button
                    className="bg-blue-600 hover:bg-blue-800 text-white cursor-pointer px-4 py-2 rounded"
                    type='submit'
                  >
                    Add Now
                  </button>
                  {/* Cancel Button */}
                  <button
                    className="bg-blue-600 hover:bg-red-600 text-white cursor-pointer px-4 py-2 rounded ml-4"
                    type='submit'
                    onClick={cancelAdd}
                  >
                    Cancel
                  </button>
                </div>

              </form>

            </div>
          </div>

        )
      }


      {/* Button to show add user form */}
      <div
        className='bg-green-600 fixed bottom-6 right-10 font-bold rounded p-3  cursor-pointer hover:bg-green-700'
        onClick={addUserPannel}
      >
        + Add User
      </div>

    </div>
  )
}

export default MyUsers
