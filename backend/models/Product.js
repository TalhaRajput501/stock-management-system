import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
  },
  // stock: {
  //   type: String,
  //   required: true
  // },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  businessId : {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Business'
  }, 
  creatAt: {
    type: Date, 
    default: Date.now
  }
})

// it is seperate because i have to search in both in name as well as category
productSchema.index({name: 1})
productSchema.index({category: 1})


const Product = mongoose.model('Product', productSchema)

export default Product
