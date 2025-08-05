import Product from '../../models/Product.js'


const searchProducts = async (req, res) => {

  const searchReq = req.query
  try {
    console.log('sales desk running') 
    console.log('products indexed')
    console.log(searchReq)
    res.json({message: searchReq})

  } catch (error) {
    console.log(error.message)
  }


}

export default searchProducts