import { Router } from "express";
import registerBusiness from "../controllers/auth/registerBusiness.js";
import login from "../controllers/auth/loginUser.js";
import registerUser from "../controllers/auth/registerUser.js";
import checkAdmin from '../middleware/checkAdmin.js'
import protectedRoute from '../middleware/protectedRoute.js'

const router = Router()

router.post('/admin', registerBusiness)
router.post('/login', login)
// only admin can use these routes and these are dashboard routes
router.post('/user/:id', protectedRoute, checkAdmin, registerUser)

router.get('/', (req, res) => {
  res.json({ message: 'working' })
})

export default router