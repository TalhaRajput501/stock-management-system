import { Router } from "express";
import addProduct from "../controllers/product/addProduct.js";
import allProducts from "../controllers/product/allProducts.js";
import deleteProduct from "../controllers/product/deleteProduct.js";
import updateProduct from "../controllers/product/updateProduct.js";
import protectedRoute from "../middleware/protectedRoute.js";
import checkAdmin from "../middleware/checkAdmin.js";
import checkUser from "../middleware/checkUser.js";
import searchProducts from "../controllers/product/searchProducts.js";


const router = Router()

// CRUD Completed
router.post('/products/:businessId', protectedRoute, checkUser, addProduct) // Create 
router.get('/products/:businessId', protectedRoute, checkUser, allProducts) // Read 
router.patch('/products/:businessId', protectedRoute,  checkUser, updateProduct) // Update
router.delete('/products/:businessId', protectedRoute, checkAdmin, deleteProduct) // Delete

// Shop Product live search route for POS
router.get('/products/:businessId/terminal-search', checkUser, searchProducts)

router.get('/info', (req, res) => {
  res.json({message: 'ready to go '})
})

export default router