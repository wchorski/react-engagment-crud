const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

exports.signUp = async(req, res) => {

  const {username, password} = req.body
  // console.log(req.body);

  const duplicateName = await User.findOne( {username: username}).exec()
  if(duplicateName) return res.sendStatus(409) 
  
  try{

    // TODO is username taken? foreach user in User db
    // TODO if yes throw client error
    // TODO if no save new user

    const hashpassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      username,
      password: hashpassword
    })

    console.log('New User Created: ' + username);
    req.session.user = newUser //? logins in after creating & gets data from session cookie
    res.status(201).json({
      status: 'successful signUp',
      data: {
        user: newUser
      }
    })


  } catch (err) {

    res.status(400).json({
      status: 'failed signup',
      user: username,
      message: err.toString(),
    })
  }
}

exports.login = async (req, res) => {
  const {username, password} = req.body

  try{
    
    const user = await User.findOne( {username} ) 

    if(!user){
      console.log('---- non-user failed login attempt: ' + username);
      res.status(404).json({
        status: 'failed login',
        user: user,
        message: 'user not found',
      })
      return
    }

    const isCorrect = await bcrypt.compare(password, user.password)
    if(isCorrect){

      req.session.user = user //? logins in & gets data from session cookie
      console.log('---- isCorrect -- user logged in: ' + username);
      console.log('---- authcontr login ');
      req.session.myguy = 'paul'
      console.log(req.session);
      
      res.status(200).json({
        status: 'successful login',
        user: user
      })

    } else {
      res.status(400).json({
        status: 'failed login',
        message: 'incorrect username or password'
      })
    }

  } catch (err) {
    res.status(400).json({
      status: 'complete failure login catch',
      message: err.toString()
    })
  }
}


exports.getAllUsers = async (req, res, next) => {
  // res.cookie("sky", "isBlue" )
  // res.cookie("grass", "green")
  // res.cookie("water", "wet")
  // res.cookie("httpOnly", "true", {httpOnly: true})

  
  try{
    const users = await User.find()

    res.status(200).json({
      status: 'successful getAllUsers',
      results: users.length, 
      data: {
        users
      }
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed to getAllUsers', message: err.toString()})
  }
}

exports.user_details = async (req, res) => {
  try{
    const user = await User.findById(req.params.id)

    res.status(200).json({
      status: 'successful user_details',
      // results: users.length, 
      data: {
        user
      }
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed to user_details', message: err.toString()})
  }

}

exports.deleteUser = async (req, res, next) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'deleted user',
      user,
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed user deletion',})
  }
}