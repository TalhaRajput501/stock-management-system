import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddProduct from './pages/AddProduct.jsx'
import Home from './pages/Home.jsx'
import MyStock from './pages/MyStock.jsx'
import RegisterBusiness from './pages/RegisterBusiness.jsx'
// import AuthLayout from './pages/AuthLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MyUsers from './pages/MyUsers.jsx'
import ProductDashboardPage from './pages/ProductDashboardPage.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import Login from './pages/Login.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import AboutProject from './pages/AboutProject.jsx'
import NewSale from './pages/NewSale.jsx'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children:
        [
          {
            path: '/',
            element: <Home /> 
          },
          {
            path: 'add-product',
            element: <ProtectedRoutes allowedRoles={['admin', 'employee']}>
            <AddProduct />
          </ProtectedRoutes>
          },
          {
            path: '/new-sale',
            element: <ProtectedRoutes allowedRoles={['admin', 'employee']}>
            <NewSale />
          </ProtectedRoutes>
          },
          {
            path: 'my-stock',
            element: <ProtectedRoutes allowedRoles={['admin', 'employee']}>
            <MyStock />
          </ProtectedRoutes>
          },
          {
            path: '/dashboard',
            element: <ProtectedRoutes allowedRoles={['admin']} >
              <Dashboard />
            </ProtectedRoutes>,
            children: [
              { index: true, element: <ProductDashboardPage /> },
              { path: 'products', element: <ProductDashboardPage /> },
              { path: 'users', element: <MyUsers /> },
              { path: 'developer', element: <AboutProject /> }
            ]
          },
          {
            path: 'account',
            children: [
              // { index: true, element: <AuthLayout /> },
              { path: 'register', element: <RegisterBusiness /> },
              { path: 'login', element: <Login /> },
            ]
          },
        ]
    }
  ]
)





createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      {/* <RouterProvider router={router}>
        <App />
      </RouterProvider> */}
      <RouterProvider router={router} />

    </Provider>
  // </StrictMode>
)
