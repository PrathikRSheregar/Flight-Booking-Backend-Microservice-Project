const { StatusCodes } = require('http-status-codes');
const { airplaneService } = require('../services');
const { errorResponse, successResponse } = require('../utils/common');

async function createAirplane(req, res) {
    try {
        const airplane = await airplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
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
async function getAirplanes(req,res){
    try{
        const airplanes=await airplaneService.getAirplanes();
        successResponse.message='Successfully fetch all airplanes';
        successResponse.data=airplanes;
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
async function getAirplane(req,res){
    try{
        const airplane=await airplaneService.getAirplane(req.params.id);
        successResponse.message='Successfully fetch  airplane';
        successResponse.data=airplane;
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
async function updateAirplane(req,res) {
   try{
        const updated_airplane=await airplaneService.updateAirplane(req.params.id,{
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        });
        successResponse.message='Successfully updated airplane';
        successResponse.data=updated_airplane;
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
async function destroyAirplane(req,res){
    try{
        const airplane=await airplaneService.destroyAirplane(req.params.id);
        successResponse.message='Successfully deleted airplane';
        successResponse.data=airplane;
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
    createAirplane,
    getAirplanes,
    getAirplane,
    updateAirplane,
    destroyAirplane
};