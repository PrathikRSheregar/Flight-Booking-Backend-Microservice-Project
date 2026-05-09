const express = require('express');
const router = express.Router();

const airplaneRoutes = require('./airplane-routes');
const infoRoutes = require('./info');
const cityRoutes=require('./city-routes')
router.use('/airplane', airplaneRoutes);
router.use('/info', infoRoutes);
router.use('/city',cityRoutes);
module.exports = router;