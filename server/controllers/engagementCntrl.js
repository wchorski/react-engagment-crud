const Engagement = require('../models/engagementModel')

exports.getAllGigs = async (req, res, next) => {
  try{
    const gigs = await Engagement.find()

    res.status(200).json({
      status: 'successful getAllGigs',
      results: gigs.length, 
      data: {
        gigs
      }
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed getAllGigs', } )
  }
}
//  api/v1/engagement/:id

exports.getOneGig = async (req, res, next) => {
  try{
    const gig = await Engagement.findById(req.params.id)

    res.status(200).json({
      status: 'success getOneGig',
      results: gig.length, 
      data: {
        gig
      }
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed catch getOneGig',})
  }
}

exports.createGig = async (req, res, next) => {
  try{

    const newGig = await Engagement.create({
      ...req.body
    })

    res.status(200).json({
      status: 'successful createGig',
      // results: newPost.length, 
      data: {
        ...newGig
      }
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed POST catch createGig',})
  }
}

exports.updateGig = async (req, res, next) => {
  try{
    const gigUpdate = await Engagement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      renValidators: true,
    })

    res.status(200).json({
      status: 'successful gig update',
      // results: posts.length, 
      data: {
        gigUpdate
      }
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed updateGig',})
  }
}

exports.deleteGig = async (req, res, next) => {
  try{
    const gig = await Engagement.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'deleted gig',
      gig,
    })

  } catch (err){
    console.log(err);
    res.status(400).json({status: 'failed gig deletion',})
  }
}