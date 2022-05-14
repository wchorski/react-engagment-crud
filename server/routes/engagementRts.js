const express = require('express')
const engagementCntrl = require('../controllers/engagementCntrl')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')


//  api/v1/engagements/...
router.route('/')
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), engagementCntrl.getAllGigs)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), engagementCntrl.createGig)
   
router.route('/:id')
  .get( engagementCntrl.getOneGig)
  .patch(engagementCntrl.updateGig)
  .delete(verifyRoles(ROLES_LIST.Admin), engagementCntrl.deleteGig)

module.exports = router;