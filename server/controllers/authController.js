const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SESSION_SECRET, REFRESH_TOKEN_SECRET} = require('../config/config')

exports.signUp = async(req, res) => {

  const {username, password, roles} = req.body
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
      password: hashpassword,
      roles: roles
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

      const roles = Object.values(user.roles).filter(Boolean)

      //* Create Web Token
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "username": user.username,
            "roles": roles
          },
        },
        SESSION_SECRET,
        { expiresIn: '20s'}
      )
      const refreshToken = jwt.sign(
        { "username": user.username},
        REFRESH_TOKEN_SECRET,
        { expiresIn: '1d'}
      )
      //? save refreshToken with current user
      user.refreshToken = refreshToken
      const result = await user.save()


      // create cookie with refresh token
      res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

      //* send auth roles and token to user
      res.status(200).json({ messsage: "successful login", username, roles, accessToken})

      console.log('---- isCorrect -- user logged in: ' + username);


    } else {
      res.status(401).json({
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