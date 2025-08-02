import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stock: {
    type: String,
    required: true
  },
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

const Product = mongoose.model('Product', productSchema)

export default Product
