  import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee'
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Business'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },


})

const User = mongoose.model('User', userSchema)
export default User
