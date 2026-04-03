import express from "express";
import inventoryRouter from './routes/inventoryRoutes.js'
import userRouter from './routes/userRoutes.js'
import dashbaordRouter from './routes/dashboardRoutes.js'
import posRouter from './routes/posRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";



const app = express()

app.use(express.json())
const allwedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:8080',
  'https://inventoryflow.azurewebsites.net' 
]

app.use(cors({
  origin: allwedOrigins,
  credentials: true
}))

app.use(cookieParser())

// Routes for products
app.use('/api/inventory', inventoryRouter)

// Routes for Admin and User
app.use('/api/users', userRouter)

// Routes for Dashboard
app.use('/api/dashboard', dashbaordRouter)

// Routes for Point of Sale
app.use('/api/pos', posRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the Inventory Management System API')
})

export default app