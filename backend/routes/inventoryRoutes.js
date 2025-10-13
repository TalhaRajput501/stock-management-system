import { Router } from "express";
import addProduct from "../controllers/product/addProduct.js";
import allProducts from "../controllers/product/allProducts.js";
import deleteProduct from "../controllers/product/deleteProduct.js";
import updateProduct from "../controllers/product/updateProduct.js";
import protectedRoute from "../middleware/protectedRoute.js";
import checkAdmin from "../middleware/checkAdmin.js";
import checkUser from "../middleware/checkUser.js";



const router = Router()

// CRUD Completed
router.post('/products/:businessId', protectedRoute, checkUser, addProduct) // Create 
router.get('/products/:businessId', protectedRoute, checkUser, allProducts) // Read 
router.patch('/products/:businessId', protectedRoute, checkUser, updateProduct) // Update 
router.delete('/products/:businessId', protectedRoute, checkAdmin, deleteProduct) // Delete


router.get('/info', (req, res) => {
  res.json({ message: 'ready to go ' })
})

export default router