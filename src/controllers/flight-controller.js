const { StatusCodes } = require('http-status-codes');
const { flightService } = require('../services');
const { errorResponse, successResponse } = require('../utils/common');

async function createFlight(req, res) {
    try {
        const flight = await flightService.createFlight({
            flightnumber:req.body.flightnumber,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId:req.body.arrivalAirportId,
            departureTime:req.body.departureTime,
            arrivalTime:req.body.arrivalTime,
            price:req.body.price,
            boardingGate:req.body.boardingGate,
            remainingSeats:req.body.remainingSeats
        });
        successResponse.message='Successfully created an flight';
        successResponse.data=flight;

        return res
            .status(StatusCodes.CREATED)
            .json(successResponse);

    } catch (error) {
        errorResponse.error=error;
        return res
        .status(error.statusCode)
        .json(errorResponse);
    }
}
async function getAllFlights(req,res){
    try{
        const flights=await flightService.getAllFlights(req.query)
        successResponse.message='Successfully fetched all airplane';
        successResponse.data=flights;

        return res
            .status(StatusCodes.OK)
            .json(successResponse);

    }catch(error){
        errorResponse.error=error;
        return res
        .status(error.statusCode)
        .json(errorResponse);
    }
}
module.exports = {
    createFlight,
    getAllFlights
};