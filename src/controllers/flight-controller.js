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
        .status(error.StatusCodes)
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
        .status(error.StatusCodes)
        .json(errorResponse);
    }
}

async function getFlight(req,res){
    try{
        const flights=await flightService.getFlight(req.params.id);
        successResponse.message='Successfully fetched all airplane';
        successResponse.data=flights;
        return res
            .status(StatusCodes.OK)
            .json(successResponse);

    }catch(error){
        errorResponse.error=error;
        return res
        .status(error.StatusCodes ||  StatusCodes.INTERNAL_SERVER_ERROR)
        .json(errorResponse);
    }
}

async function updateSeats(req,res){

    try{
        const response =await flightService.updateSeats({
            flightId:req.params.id,
            seats:req.body.seats,
            dec:req.body.dec
        });

        return res.status(200).json({
            success:true,
            data:response
        });

    }catch(error){

        return res.status(400).json({
            success:false,
            message:error.message
        });
    }
}
module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};