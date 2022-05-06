const express = require('express')

//  http://localhost/api/v1/engagements/...

const engagementCntrl = require('../controllers/engagementCntrl')

const router = express.Router()


router.route('/')
  .get(engagementCntrl.getAllGigs)
  .post(engagementCntrl.createGig)
  //TODO protect all  
  // .post(protect, postController.createPost)
   
router.route('/:id')
  .get(engagementCntrl.getOneGig)
  .patch(engagementCntrl.updateGig)
  .delete(engagementCntrl.deleteGig)

module.exports = router;