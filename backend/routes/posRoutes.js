import {Router} from 'express';
import searchProducts from "../controllers/pointOfSale/searchProducts.js";
import completeSale from '../controllers/pointOfSale/completeSale.js'

const router = Router()


// Shop Product live search route for POS
router.get('/live-search/:businessId', searchProducts)
// router.post('/sale', completeSale)

router.post('/sale/:businessId', completeSale)


export default router