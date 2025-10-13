import Product from '../../models/Product.js'


const searchProducts = async (req, res) => {
  try {
    // console.log('search product')
    const { userQuery } = req.query
    const { businessId } = req.params
    if (userQuery.trim().length === 0) return

    const searchQuery = userQuery.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // this will not break my code if user enter ()[]* or any symbol in search bar 

    // ------------------------
    // match products by business id 
    // and match with name partial search like 
    // if the whole name in db of product is panadol if you only write pan it will give you that product 
    // in other words we are doing partial search  
    const matchedProducts = await Product.find(
      {
        businessId,
        $or : [
          {name: { $regex: `${searchQuery}`, $options: 'i' }},
          {category: { $regex: `${searchQuery}`, $options: 'i' }},
        ]
      }
    )
    res.json({ matchedProducts })
  } catch (error) {
    res.status(400).json({ message: 'SERVER ERROR :: searchProduct' })
  }

}

export default searchProducts