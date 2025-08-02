import User from "../../models/User.js"
import bcrypt from 'bcrypt'

const registerUser = async (req, res) => {
  console.log('registerUser controller running')
  const { name, email, password } = req.body
  const {id} = req.params
  if (!name || !email || !password || !id) return res.status(401).json({ message: 'All fields are required' })

    const encryptedPassword = await bcrypt.hash(password, 10)

  try {

    const addedUser = new User({
      name,
      email,
      password : encryptedPassword,
      businessId : id,
    })

    await addedUser.save()
    res.json({ message: 'User registered successfuuly' })

  } catch (error) {
    res.status(401).json({message : 'SERVER ERROR :: registerUser'})
  }

}

export default registerUser