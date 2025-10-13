import Product from "../../models/Product.js";

const addProduct = async (req, res) => {
  try {
    console.log('reached in backend')
    const { businessId } = req.params
    const { name, stock, price, quantity, category } = req.body
    if (!name || !price || !quantity || !category) return res.status(401).json({ message: 'Product information is incomplete' })

    const newProduct = new Product({
      name,
      stock,
      price,
      category: category.toLowerCase(),
      quantity,
      businessId: businessId
    })

    await newProduct.save()
    // console.log('this is new product', newProduct)
    res.json({ message: 'product added successfully', newProduct })
  } catch (error) {
    console.log('Error in controller :: addProduct')
    res.status(400).json({ error })

  }
}

export default addProduct