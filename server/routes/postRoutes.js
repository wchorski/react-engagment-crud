const express = require('express')

//  http://localhost/api/v1/posts/...

const postController = require('../controllers/postController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()


router.route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost)
  //TODO protect all  
  // .post(protect, postController.createPost)
   
router.route('/:id')
  .get(postController.getOnePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router;