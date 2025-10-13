import Product from '../../models/Product.js'

const completeSale = async (req, res) => {

  try {
    const { businessId } = req.params
    const { soldProducts } = req.body 

    // we are defining what we have to do for each product 
    const opreation = soldProducts.map(item =>
    (
      {
        updateOne: {
          filter: { _id: item.id, businessId },
          update: {
            $inc: { quantity: -item.quantity }
          }
        }
      }
    )
    )

    // now we are writing in bulk for every product in one db call 
    await Product.bulkWrite(opreation)

    res.json({ message: "Sale completed and stock updated." });
    // console.log("Sale completed and stock updated.")

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default completeSale
