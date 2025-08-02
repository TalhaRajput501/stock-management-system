import User from "../../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const login = async (req, res) => {
  const { name, password } = req.body
  console.log(name, password)

  try {

    if (!name || !password) {
      res.status(400).json({ message: 'Name and password are required' })
      return
    }

    const user = await User.findOne({ name })
    if (!user) return res.status(401).json({ message: 'User not found' })


    // bcrypt.compare method just return true or false according if password match with hash 
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) return res.status(401).json({ message: 'Invalid credentials' })


    const accessToken = jwt.sign({
      user: {
        _id: user._id,
        role: user.role,
        businessId: user.businessId
      }
    }, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '1d' })


    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, // change it in production 
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    })

    res.json({ status: true, message: 'Login successfull', user: {
      _id: user._id,
      role: user.role,
      businessId: user.businessId,
      isLoggedIn: true
    } })


  } catch (error) {
    res.status(401).json({ message: 'Server error during login ' })
    // res.status(400).json({ message: error.message }) 
  }

}

export default login