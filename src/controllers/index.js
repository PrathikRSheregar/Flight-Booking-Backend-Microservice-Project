const { info } = require('./info-controller');
const airplaneController = require('./airplane-controller');
const cityController=require('./city-controller');
const airportController=require('./airport-controller');
const flightController=require('./flight-controller');
module.exports = {
    info,
    airplaneController,
    cityController,
    airportController,
    flightController
}; 