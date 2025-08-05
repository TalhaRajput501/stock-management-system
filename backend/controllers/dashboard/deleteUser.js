import User from "../../models/User.js"

const deleteUser = async (req, res) => {
  const {userId} = req.params
  try {
    await User.findByIdAndDelete(userId)
    res.json({message: 'User delete successfully'})
  } catch (error) {
    res.status(401).json({message: 'Server error :: deleteUser'})
  }
}

export default deleteUser