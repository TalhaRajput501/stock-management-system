import mongoose from "mongoose";

const businessModel = new mongoose.Schema({
  businessName: {
    type: String, 
    required: [true , 'Business name is required']
  }, 
  location: {
    type: String
  }, 
  createdAt: {
    type: Date, 
    default: Date.now
  }


})

const Business = mongoose.model('Business', businessModel)
export default Business 