const { StatusCodes } = require('http-status-codes');
const { flightService } = require('../services');
const { errorResponse, successResponse } = require('../utils/common');

async function createFlight(req, res) {
    try {
        const airplane = await flightService.createFlight({
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
        successResponse.message='Successfully created an airplane';
        successResponse.data=airplane;

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
module.exports = {
    createFlight
};