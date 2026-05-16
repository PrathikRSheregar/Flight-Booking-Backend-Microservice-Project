const {CrudRepository} = require('../repositories');
const {FlightRepository} = require('../repositories');
const AppError=require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
const flightRepo = new FlightRepository();

async function createFlight(data) {
    try { 
        const flight = await flightRepo.create(data);
        return flight;
    } catch (error) {
        console.log(error);
        throw new AppError('Some mistake in crud repo',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createFlight
};