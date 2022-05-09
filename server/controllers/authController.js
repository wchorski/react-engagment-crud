const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

exports.signUp = async(req, res) => {

  const {username, password} = req.body
  
  try{

    const hashpassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      username,
      password: hashpassword
    })

    res.status(201).json({
      status: 'successful signUp',
      data: {
        user: newUser
      }
    })

  } catch (err) {
    res.status(400).json({
      status: 'failed signup',
      message: err.toString()
    })
  }
}

exports.login = async (req, res) => {
  const {username, password} = req.body

  try{
    
    const user = await User.findOne( {username} ) 

    if(!user){
      res.status(404).json({
        status: 'failed login',
        message: 'user not found'
      })
      return
    }

    const isCorrect = await bcrypt.compare(password, user.password)
    if(isCorrect){

      // req.session.user = user
      console.log('---- user logged in: ' + username);
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
      status: 'failed login catch',
      message: err.toString()
    })
  }
}


exports.getAllUsers = async (req, res, next) => {
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