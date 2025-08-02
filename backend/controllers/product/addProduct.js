import Product from "../../models/Product.js";

const addProduct = async (req, res) => {
  const { id } = req.params
  try {
    const { name, stock, price, quantity, category } = req.body
    if (!name || !stock || !price || !quantity || !category) return res.status(401).json({ message: 'Product information is incomplete' })

    const newProduct = new Product({
      name,
      stock,
      price,
      category: category.toLowerCase(),
      quantity,
      businessId: id
    })

    await newProduct.save()
    console.log('this is new product', newProduct)
    res.json({ message: 'product added successfully', newProduct })
  } catch (error) {
    console.log('Error in controller :: addProduct')
    res.json({ error })

  }
}

export default addProduct