import jwt from 'jsonwebtoken'

const protectedRoute = (req, res, next) => {
  // console.log('protected middlware running')
  const token = req.cookies.accessToken


  if (!token) return res.status(401).json({ message: 'Login first' })


  try {
    const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)

    // console.log('this is decoded', data)
    // send this decoded data to next middleware
    req.user = data
    next()


  } catch (error) {
    res.status(401).json({ message: 'Token invalid or expired' })
  }
}

export default protectedRoute