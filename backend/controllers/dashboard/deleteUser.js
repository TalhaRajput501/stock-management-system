import User from "../../models/User.js"

const deleteUser = async (req, res) => {
  const {id} = req.params
  try {
    await User.findByIdAndDelete(id)
    res.json({message: 'User delete successfully'})
  } catch (error) {
    res.status(401).json({message: 'Server error :: deleteUser'})
  }
}

export default deleteUser