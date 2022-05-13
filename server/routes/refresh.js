const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenContr');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;

