const express = require('express')
//  http://localhost/api/v1/engagements/...
const engagementCntrl = require('../controllers/engagementCntrl')
const router = express.Router()
const protect = require('../middleware/authMiddleware')


router.route('/')
  .get(protect, engagementCntrl.getAllGigs)
  // .post(engagementCntrl.createGig) 
  .post(protect, engagementCntrl.createGig)
   
router.route('/:id')
  .get(engagementCntrl.getOneGig)
  .patch(engagementCntrl.updateGig)
  .delete(engagementCntrl.deleteGig)

module.exports = router;