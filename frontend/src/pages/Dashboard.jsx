import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { setIsMenu } from "../features/dashboardMenuSlice";
import { BlurBgShape } from "../components";

function Dashboard() {
  const isMenu = useSelector((state) => state.menuBar.isMenu);
  const dispatch = useDispatch();

  const handleMenuBar = () => {
    dispatch(setIsMenu());
  };

  return (
    <>
      {/* Top blur background shape */}
      <BlurBgShape />

      <div className=" h-[calc(100vh-72px)] text-gray-900 dark:text-white flex transition-all duration-200 ">

        {/* ☰ Hamburger Icon - Only visible when sidebar is hidden */}
        {!isMenu && (
          <div className="fixed top-15 left-5 z-50">
            <abbr title="Open Menu" className="no-underline px-2">
              <li
                onClick={handleMenuBar}
                className="list-none px-3 py-2 text-2xl cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 hover:text-white rounded-lg border border-gray-800 dark:border-white text-center bg-white dark:bg-gray-800"
              >
                ☰
              </li>
            </abbr>
          </div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-18 -left-7 h-full px-3 z-40 transition-all duration-300
              ${isMenu ? 'md:w-[240px] w-[80%] left-0' : 'w-0  overflow-hidden'}
                md:border-r border-gray-400 dark:border-gray-700 md:bg-transparent 
                dark:bg-gray-900/95 bg-gray-300/95
                `}
        >

          {/* ✕ Close Icon - Only visible when sidebar is open */}
          <div className="fixed top-15 left-5 z-50">
            <abbr title="Close Menu" className="no-underline px-2">
              <li
                onClick={handleMenuBar}
                className="list-none px-3 py-2 text-2xl cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 hover:text-white rounded-lg border border-gray-800 dark:border-white text-center bg-white dark:bg-gray-800"
              >
                ✕
              </li>
            </abbr>
          </div>

          {/* Sidebar Links */}
          <div className="w-full mt-22">

            <div>
              <NavLink to="products" className={({ isActive }) => `block px-4 py-3     font-bold hover:text-white hover:bg-gray-400 dark:hover:bg-gray-700  rounded-lg ${isActive ? ' text-blue-500 ' : 'dark:text-gray-200 text-gray-800'}`}>
                Products Overview
              </NavLink>
            </div>

            <div>
              <NavLink to="users" className={({ isActive }) => `block px-4 py-3     font-bold hover:text-white hover:bg-gray-400 dark:hover:bg-gray-700  rounded-lg ${isActive ? ' text-blue-500 ' : 'dark:text-gray-200 text-gray-800'}`}>
                My Users
              </NavLink>
            </div>

            <div>
              <NavLink to="developer" className={({ isActive }) => `block px-4 py-3     font-bold hover:text-white hover:bg-gray-400 dark:hover:bg-gray-700  rounded-lg ${isActive ? ' text-blue-500 ' : 'dark:text-gray-200 text-gray-800'}`}>
                Developer Point
              </NavLink>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div
          className={`ml-0 ${isMenu ? '  md:ml-[240px]   ' : 'ml-0'}   transition-all duration-300 w-full p-7 overflow-y-auto  `}
        >
          <Outlet /> 
        </div>
      </div>

    </>
  );
}

export default Dashboard;
