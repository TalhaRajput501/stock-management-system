import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Switch from './Switch.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setIsLoggedIn, setUserData } from '../features/authSlice.js'
function Header() {

  const [isDarkTheme, setIsDarkTheme] = useState(false)
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  let role = useSelector((state) => state.auth.userData.role)

  // let role = userRole || JSON.parse(sessionStorage.getItem('userInfo'))?.role

  const dispatch = useDispatch()

  // Responsive Menu
  function showHideNav() {
    // console.log('clicked')
    const nav = document.getElementById('navbar-cta')
    if (window.innerWidth <= 768) {
      nav.classList.toggle('hidden')
    }
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    document.documentElement.classList.toggle('dark')
  }

  // Logout Logic
  const logout = async () => {
    sessionStorage.removeItem('userInfo')
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include'
    })

    const data = await res.json()
    if (!res.ok) return alert(data.message)
    dispatch(setIsLoggedIn(false))  

  }

  // Navigation bar links
  const navItems = [
    {
      name: 'Dashboard',
      goto: '/dashboard',
      status: true,
      accessTo: ['admin']
    },
    {
      name: 'My Stock',
      goto: '/my-stock',
      status: true,
      accessTo: ['admin', 'employee']
    },
    {
      name: 'Add Product',
      goto: '/add-product',
      status: true,
      accessTo: ['admin', 'employee']
    }
  ]


  return (


    <nav className="bg-gray-400   border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Home Logo and Toggle Theme Button */}
        <div className='flex items-center sm:gap-4 justify-center'>
          <NavLink className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-900 dark:text-white">Stock Manager</span>
          </NavLink>

          {/* Toggle Theme Button - New Version */}
          <Switch
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
          />

        </div>

        {/* Hamburgur Icon */}
        <div className="flex md:order-1 md:hidden space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={showHideNav}
            type="button"
            className="text-white bg-blue-700 menu hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg  px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-2xl"
          >☰</button>
        </div>

        {/* Navigation Bar Starts here */}
        <div className="items-center justify-between w-full hidden md:flex md:w-auto" id="navbar-cta">

          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-blue-600 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">


            {/* NavLinks */}

            {/* Shop Button */}
            {isLoggedIn && // will not visible after login
              <NavLink
                to={'/new-sale'}
                className={({ isActive }) => ` block py-2 px-3  font-bold hover:bg-gradient-to-r to-emerald-500 from-sky-300  hover:rounded-2xl hover:text-white rounded-sm md:bg-transparent  ${isActive ? 'text-blue-900 dark:text-blue-500' : 'text-white'}`}
              >
                New Sale
              </NavLink>
            }

            {/* Home Button */}
            {!isLoggedIn && // will not visible after login
              <NavLink
                to={'/'}
                className={({ isActive }) => ` block py-2 px-3  font-bold hover:bg-gradient-to-r to-emerald-500 from-sky-300  hover:rounded-2xl hover:text-white rounded-sm md:bg-transparent  ${isActive ? 'text-blue-900 dark:text-blue-500' : 'text-white'}`}
              >
                Home
              </NavLink>
            }


            {isLoggedIn &&
              navItems
                .filter((item) => item.status && item.accessTo.includes(role))
                .map((element) => (
                  element.status && (
                    <li
                      key={element.name}
                    >
                      <NavLink
                        to={element.goto}
                        className={({ isActive }) => `  block py-2 px-3  font-bold hover:bg-gradient-to-r to-emerald-500 from-sky-300 hover:rounded-2xl hover:text-white rounded-sm md:bg-transparent  ${isActive ? 'text-blue-900 dark:text-blue-500' : 'text-white'}`}
                      >
                        {element.name}
                      </NavLink>
                    </li>
                  )
                ))
            }

            {/* LogIn Button */}
            {!isLoggedIn ? // will not visible after login
              <NavLink
                to={'/account/login'}
                className={({ isActive }) => ` block py-2 px-3  font-bold hover:bg-gradient-to-r to-emerald-500 from-sky-300 hover:rounded-2xl hover:text-white rounded-sm md:bg-transparent  ${isActive ? 'text-blue-900 dark:text-blue-500' : 'text-white'}`}
              >
                Login
              </NavLink>
              :
              // LogOut Button
              <NavLink
                to={''}  // will visible in logged in
                onClick={logout}
                className={` block py-2 px-3  font-bold hover:bg-red-500 hover:rounded-2xl hover:text-white rounded-sm md:bg-transparent  text-white`}
              >
                Logout
              </NavLink>
            }

            {/* Get Started Button */}
            {!isLoggedIn &&
              <li>
                <NavLink
                  to={'/account/register'}
                  className={` block py-2  px-3 text-center font-bold bg-blue-500 hover:bg-blue-600 hover:scale-125 duration-500 text-white rounded-sm`}
                >
                  Get Started
                </NavLink>
              </li>
            }

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
