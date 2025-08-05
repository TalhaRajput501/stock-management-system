import Product from "../../models/Product.js";

const updateProduct = async (req, res) => {
  try {
    const { businessId } = req.params
    const {name, stock, price, quantity, category} = req.body
    const updatedProduct = await Product.findByIdAndUpdate(businessId, {
      name,
      stock, 
      price, 
      quantity,
      category
    }, {
      new: true
    })

    res.json({success: true, updatedProduct})
    // console.log('Updated Product',updatedProduct)
  } catch (error) {
    res.json({message: "Server ERROR in update product", error})
  }
}


export default updateProduct