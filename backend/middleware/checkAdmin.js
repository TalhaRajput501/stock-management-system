

const checkAdmin = (req, res, next) => {

  try {
    console.log('checkAdmin midddlware running')
    let data = req.user
    if(data.user.role === 'admin') {  
      next()
      return
    } else{
      res.status(401).json({message: 'You are not admin'})
    }

  } catch (error) {
    return res.status(401).json({message: 'SERVER ERROR :: checkAdmin'})
  }
}

export default checkAdmin