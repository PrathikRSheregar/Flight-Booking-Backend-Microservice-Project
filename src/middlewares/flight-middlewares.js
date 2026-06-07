const { errorResponse } = require('../utils/common');

const {StatusCodes}=require('http-status-codes');
const compareTime=require('../utils/helper');
function validateCreateRequest(req,res,next){
    if(!req.body.flightnumber)
    {
    errorResponse.message='Something went wrong while creating airplane';
    errorResponse.error=['flightnumber not found on the incoming request'];
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
    if(req.body.airplaneId === undefined)
    {
    errorResponse.message='Something went wrong while creating airplane';
    errorResponse.error=['airplaneId not found on the incoming request'];
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
    if(!req.body.departureAirportId)
    {
    errorResponse.message='Something went wrong while creating airplane';
    errorResponse.error=['depatureAirportId not found on the incoming request'];
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
    if(!req.body.arrivalAirportId)
    {
    errorResponse.message='Something went wrong while creating airplane';
    errorResponse.error=['arrivalAirportId not found on the incoming request'];
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
    if(!req.body.departureTime)
    {
    errorResponse.message='Something went wrong while creating airplane';
    errorResponse.error=['depatureTime not found on the incoming request'];
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
    if(!req.body.arrivalTime)
    {
    errorResponse.message='Something went wrong while creating airplane';
    errorResponse.error=['arrivalTime not found on the incoming request'];
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
    if(req.body.price === undefined)
    {
    errorResponse.message='Something went wrong while creating airplane';
    errorResponse.error=['price not found on the incoming request'];
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
    if (!compareTime(req.body.departureTime, req.body.arrivalTime)) {
    errorResponse.message='Something went wrong while creating flight';
    errorResponse.error=['Arrival time must be greater than departure time'];
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    };
 next();
}
function validateUpdateSeatsRequest(req,res,next){
    if(!req.body || req.body.seats === undefined)
    {
    errorResponse.message='Something went wrong while updating seats';
    errorResponse.error=['Seats not found on the incoming request'];
    return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
    next();
}
module.exports={
    validateCreateRequest,
    validateUpdateSeatsRequest
};
