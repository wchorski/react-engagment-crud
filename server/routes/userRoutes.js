// /api/v1/users/...

const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()
const app = express()

// /api/v1/users/...
router.post('/signup',  authController.signUp)
router.post('/login',   authController.login)

// /api/v1/users/...
router.route('/')
  .get(authController.getAllUsers)

router.route('/:id')
  .get(authController.user_details)
  .delete(authController.deleteUser)


module.exports = router