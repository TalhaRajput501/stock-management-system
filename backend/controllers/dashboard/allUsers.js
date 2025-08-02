import User from '../../models/User.js'
import Product from '../../models/Product.js'


const allUsers = async (req, res) => {

  const {id} = req.params
  
  try {
    const users = await User.find({businessId: id, role: 'employee'})

    res.json({allUsers: users})
  } catch (error) {
    res.status(401).json({message: 'Server error :: allUsers'})
  }
  


}


export default allUsers