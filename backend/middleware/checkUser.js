
const checkUser = (req, res, next) => {
  // console.log('checkUser middleware running')
  try {
    
    const data = req.user
    // console.log(data)

    const allowedRoles = ['admin', 'employee']
    
    if(allowedRoles.includes(data.user.role)){
      next()
      return
    }else{
      res.status(401).json({message : "You are not authorized to do this action"})
    }
  } catch (error) {
    res.status(401).json({message : "SERVER ERROR :: checkUser"})
  }

}

export default checkUser