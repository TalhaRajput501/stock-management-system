import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Switch from './Switch.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

  const [isDarkTheme, setIsDarkTheme] = useState(false)
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedInInfo = useSelector((state) => state.auth.userData.isLoggedIn)
  const isLoggedIn = loggedInInfo || JSON.parse(sessionStorage.getItem('userInfo'))?.isLoggedIn
  // get role from redux if available otherwise take form localstorage
  let userRole = useSelector((state) => state.auth.userData.role)
  let role = userRole || JSON.parse(sessionStorage.getItem('userInfo'))?.role

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

  const logout = () => {
    sessionStorage.removeItem('userInfo')
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

            {/* Home Button */}
            {
              <NavLink
                to={'/'}
                className={({ isActive }) => ` block py-2 px-3  font-bold hover:bg-blue-500 hover:rounded-full hover:text-white rounded-sm md:bg-transparent  ${isActive ? 'text-blue-900 dark:text-blue-500' : 'text-white'}`}
              >
                Home
              </NavLink>
            }


            {
              navItems
                .filter((item) => item.status && item.accessTo.includes(role))
                .map((element) => (
                  element.status && (
                    <li
                      key={element.name}
                    >
                      <NavLink
                        to={element.goto}
                        className={({ isActive }) => `  block py-2 px-3  font-bold hover:bg-blue-500 hover:rounded-full hover:text-white rounded-sm md:bg-transparent  ${isActive ? 'text-blue-900 dark:text-blue-500' : 'text-white'}`}
                      >
                        {element.name}
                      </NavLink>
                    </li>
                  )
                ))
            }

            {/* LogIn Button */}
            {
              !isLoggedIn ?
                <NavLink
                  to={'/account/login'}
                  className={({ isActive }) => ` block py-2 px-3  font-bold hover:bg-blue-500 hover:rounded-full hover:text-white rounded-sm md:bg-transparent  ${isActive ? 'text-blue-900 dark:text-blue-500' : 'text-white'}`}
                >
                  Login
                </NavLink>
                :
                // LogOut Button
                <NavLink
                  to={''}
                  onClick={logout}
                  className={({ isActive }) => ` block py-2 px-3  font-bold hover:bg-blue-500 hover:rounded-2xl hover:text-white rounded-sm md:bg-transparent  text-white`}
                >
                  Logout
                </NavLink>
            }

            {/* Get Started Button */}
            {
              <li>
                <NavLink
                  to={'/account/register'}
                  className={`${role === 'admin' ? 'hidden' : 'block'} block py-2  px-3 text-center font-bold bg-blue-500 hover:bg-blue-600 hover:scale-125 duration-500 text-white rounded-sm`}
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
