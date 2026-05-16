const express = require('express');
const router = express.Router();

const airplaneRoutes = require('./airplane-routes');
const infoRoutes = require('./info');
const cityRoutes=require('./city-routes');
const airportRoutes=require('./airport-routes');
router.use('/airplanes', airplaneRoutes);
router.use('/info', infoRoutes);
router.use('/cities',cityRoutes);
router.use('/airports',airportRoutes);
module.exports = router;