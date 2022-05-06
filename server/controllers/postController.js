const Post = require('../models/postModel')

exports.getAllPosts = async (req, res, next) => {
  try{
    const posts = await Post.find()

    res.status(200).json({
      status: 'successful getAllPosts',
      results: posts.length, 
      data: {
        posts
      }
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'fail',})
  }
}
//  localhost:3001/api/v1/posts/:id

exports.getOnePost = async (req, res, next) => {
  try{
    const posts = await Post.findById(req.params.id)

    res.status(200).json({
      status: 'succes',
      results: posts.length, 
      data: {
        posts
      }
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed post catch getOnePost',})
  }
}

exports.createPost = async (req, res, next) => {
  try{

    const {title, body} = req.body
    const newPost = await Post.create({
      title,
      body
    })

    res.status(200).json({
      status: 'successful createPost',
      // results: newPost.length, 
      data: {
        title: newPost.title,
        body: newPost.body
      }
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed post catch createPost',})
  }
}

exports.updatePost = async (req, res, next) => {
  try{
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      renValidators: true,
    })

    res.status(200).json({
      status: 'successful update',
      // results: posts.length, 
      data: {
        posts
      }
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'fail',})
  }
}

exports.deletePost = async (req, res, next) => {
  try{
    const posts = await Post.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'deleted post',
      posts,
      title: posts.title,
      body: posts.body
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed post deletion',})
  }
}