import { Router } from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import allUsers from "../controllers/dashboard/allUsers.js";
import stats from "../controllers/dashboard/stats.js";
import checkAdmin from "../middleware/checkAdmin.js";
import deleteUser from "../controllers/dashboard/deleteUser.js";



const router = Router()


// Dashboard Routes
router.get('/stats/:id', protectedRoute, checkAdmin, stats)
router.get('/users/:id', protectedRoute, checkAdmin, allUsers)
router.delete('/user/:id', protectedRoute, checkAdmin, deleteUser)

router.get('/info', (req, res) => {
  res.json({ message: 'ok ha g' })
})

export default router