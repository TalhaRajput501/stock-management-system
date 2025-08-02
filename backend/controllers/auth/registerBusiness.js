import Business from "../../models/Business.js"
import User from "../../models/User.js"
import bcrypt from 'bcrypt'


const registerBusiness = async (req, res) => {
  const { name, email, businessName, location } = req.body
  const password = req.body.password
  
  if( !name || !email || !businessName || !location || !password ) return res.status(400).json({message: 'All fields are required'})

  try {

    const business = new Business({
      businessName,
      location
    })
    await business.save()
    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10) 
    const user = new User({
      name,
      email,
      password: encryptedPassword,
      role: 'admin',
      businessId: business._id
    })
    await user.save()


    res.json({
      message: 'working properly admin and business register',
      user,
      business
    })
  } catch (error) {
    console.log(error)
    res.json({ message: "something wrong in admin :: admin controller" })
  }
}

export default registerBusiness
