const express = require('express')
const engagementCntrl = require('../controllers/engagementCntrl')
const router = express.Router()
const protect = require('../middleware/authMiddleware')


//  api/v1/engagements/...
router.route('/')

  .get(engagementCntrl.getAllGigs)
  // .post(engagementCntrl.createGig) 
  .post(protect, engagementCntrl.createGig)
   
router.route('/:id')
  .get(protect, engagementCntrl.getOneGig)
  .patch(engagementCntrl.updateGig)
  .delete(engagementCntrl.deleteGig)

module.exports = router;