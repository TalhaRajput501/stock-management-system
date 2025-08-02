import Product from "../../models/Product.js";

const allProducts = async (req, res) => {
  const page = parseInt(req.query.page) 
  const limit = parseInt(req.query.limit)  
  const { id } = req.params

  const skip = (page - 1) * limit 
  try { 
    const allProducts = await Product.find({businessId : id}).limit(limit).skip(skip)
    // const allProducts = await Product.find().limit(limit).skip(skip) 
    // console.log(allProducts)
    res.json(allProducts)
  } catch (error) {
    res.json({message: error.message})
  }
}  

export default allProducts