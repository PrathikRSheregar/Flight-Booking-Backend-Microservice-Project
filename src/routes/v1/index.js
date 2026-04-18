const express = require('express');
const router = express.Router();

const airplaneRoutes = require('../airplaneroutes');
const infoRoutes = require('./info');

router.use('/airplane', airplaneRoutes);
router.use('/info', infoRoutes);

module.exports = router;