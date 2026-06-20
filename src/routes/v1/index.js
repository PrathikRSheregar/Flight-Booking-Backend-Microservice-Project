const express = require('express');
const router = express.Router();

const airplaneRoutes = require('./airplane-routes');
const infoRoutes = require('./info');
const cityRoutes=require('./city-routes');
const airportRoutes=require('./airport-routes');
const flightRoutes=require('./flight-routes');
const {authRequestMiddlewares} = require('../../middlewares');
router.use('/airplanes',airplaneRoutes);
router.use('/info',authRequestMiddlewares.isAdmin,infoRoutes);
router.use('/cities',authRequestMiddlewares.isAdmin,cityRoutes);
router.use('/airports',airportRoutes);
router.use('/flights',flightRoutes);
module.exports = router;