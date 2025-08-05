import Product from "../../models/Product.js"
import mongoose from "mongoose"

const stats = async (req, res) => {
  const { id } = req.params
  try {

    // TODO: wrap all aggregate in await promis.all
    console.log(id)
    // It will  give me the total worth of my business
    const totalWorth = await Product.aggregate([
      { $match: { businessId: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: '$businessId', total: { $sum: { $multiply: ['$quantity', '$price'] } } } }
    ])

    // This will return total products by category 
    const productsByCategory = await Product.aggregate([
      { $match: { businessId: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: '$category', categoryName: { $first: "$category" }, total: { $sum: "$quantity" } } }
    ])

    // This is will return in stock and out of stock items 
    const stock = await Product.aggregate([
      { $match: { businessId: new mongoose.Types.ObjectId(id) } },
      { $match: { stock: { $in: ['available', 'empty'] } } },
      { $group: { _id: '$stock', count: { $sum: 1 } } }
    ])

    // console.log(stock)

    res.json({
      totalWorth,
      productsByCategory,
      stock
    })

  } catch (error) {
    res.status(401).json({ message: 'Server error :: stats' })

  }

}

export default stats