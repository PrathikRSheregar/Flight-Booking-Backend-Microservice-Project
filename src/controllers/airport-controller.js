const { StatusCodes } = require('http-status-codes');
const { airportService } = require('../services');
const { errorResponse, successResponse } = require('../utils/common');

async function createAirport(req, res) {
    try {
        const airport = await airportService.createAirport({
            name: req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId: req.body.cityId
        });
        successResponse.message='Successfully created an airport';
        successResponse.data=airport;

        return res
            .status(StatusCodes.CREATED)
            .json(successResponse);

    } catch (error) {
        errorResponse.error=error;
        return res
        .status(error.statusCode || 500)
        .json(errorResponse);
    }
}
async function getAirports(req,res){
    try{
        const airports=await airportService.getAirports();
        successResponse.message='Successfully fetch all airports';
        successResponse.data=airports;
        return res
            .status(StatusCodes.OK)
            .json(successResponse);
    }catch(error){
        errorResponse.error=error;
        return res
        .status(error.statusCode || 500)
        .json(errorResponse);
    }
}
async function getAirport(req,res){
    try{
        const airport=await airportService.getAirport(req.params.id);
        successResponse.message='Successfully fetch airport';
        successResponse.data=airport;
        return res
            .status(StatusCodes.OK)
            .json(successResponse);
    }catch(error){
        errorResponse.error=error;
        return res
        .status(error.statusCode || 500)
        .json(errorResponse);
    }
}
async function updateAirport(req,res) {
   try{
        const updated_airport=await airportService.updateAirport(req.params.id,{
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId
        });
        successResponse.message='Successfully updated airport';
        successResponse.data=updated_airport;
        return res
            .status(StatusCodes.OK)
            .json(successResponse);
    }catch(error){
        errorResponse.error=error;
        return res
        .status(error.statusCode||500)
        .json(errorResponse);
    } 
}
async function destroyAirport(req,res){
    try{
        const airport=await airportService.destroyAirport(req.params.id);
        successResponse.message='Successfully deleted airport';
        successResponse.data=airport;
        return res
            .status(StatusCodes.OK)
            .json(successResponse);
    }catch(error){
        errorResponse.error=error;
        return res
        .status(error.statusCode || 500)
        .json(errorResponse);
    }
}
module.exports = {
    createAirport,
    getAirports,
    getAirport,
    updateAirport,
    destroyAirport
};