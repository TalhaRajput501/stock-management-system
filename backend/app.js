import express from "express";
import inventoryRouter from './routes/inventoryRoutes.js'
import userRouter from './routes/userRoutes.js'
import dashbaordRouter from './routes/dashboardRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";



const app = express()

app.use(express.json())
app.use(cors({
  origin :'http://localhost:5173',
  credentials: true
}))

app.use(cookieParser())

// Routes for products
app.use('/api/inventory', inventoryRouter)

// Routes for Admin and User
app.use('/api/users', userRouter)

// Routes for Dashboard
app.use('/api/dashboard', dashbaordRouter)

app.get('/', (req, res) => {
  res.send('this is backend')
})

export default app