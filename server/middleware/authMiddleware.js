const protect = (req, res, next) => {
  
  const {user} = req.session
  console.log("--authMiddle.js--");
  console.log(req.session);


  if(!user){ return res.status(401).json({status: 'fail', message: 'user unauthorized'}) }

  req.user = user

  next()
}

module.exports = protect