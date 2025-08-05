import Product from "../../models/Product.js"

const deleteProduct = async (req, res) => {
  try {
    console.log('delete controller running ')
    const { businessId } = req.params 
    const deletedProduct = await Product.findByIdAndDelete(businessId)
    // console.log(deletedProduct)
    res.json({success: true, message: 'Product Deleted successfuly', deletedProduct})
    
  } catch (error) {
    return res.status(401).json({message: 'ERROR in deleting the product.'})
  } 
}



export default deleteProduct