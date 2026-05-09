const { info } = require('./info-controller');
const airplaneController = require('./airplane-controller');
const cityController=require('./city-controller')
module.exports = {
    info,
    airplaneController,
    cityController
};