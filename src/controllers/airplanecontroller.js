const { StatusCodes } = require('http-status-codes');
const { airplaneService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

async function createairplane(req, res) {
    try {
        const airplane = await airplaneService.createairplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.message='Successfully create an airplane';
        SuccessResponse.data=airplane;

        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error=error;
        ErrorResponse.message=error.message;
        return res
        .status(error.statuscode)
        .json(ErrorResponse);
    }
}
async function getAirplanes(req,res){
    try{
        const airplanes=await airplaneService.getAirplanes();
        SuccessResponse.message='Successfully fetch all airplanes';
        SuccessResponse.data=airplanes;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        ErrorResponse.message=error.message;
        return res
        .status(error.statuscode)
        .json(ErrorResponse);
    }
}
async function getAirplane(req,res){
    try{
        const airplane=await airplaneService.getAirplane(req.params.id);
        SuccessResponse.message='Successfully fetch  airplane';
        SuccessResponse.data=airplane;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        ErrorResponse.message=error.message;
        return res
        .status(error.statuscode)
        .json(ErrorResponse);
    }
}
async function updateAirplane(req,res) {
   try{
        const updated_airplane=await airplaneService.updateAirplane(req.params.id,{
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        });
        SuccessResponse.message='Successfully updated airplane';
        SuccessResponse.data=updated_airplane;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        ErrorResponse.message=error.message;
        return res
        .status(error.statuscode)
        .json(ErrorResponse);
    } 
}
async function destroyAirplane(req,res){
    try{
        const airplane=await airplaneService.destroyAirplane(req.params.id);
        SuccessResponse.message='Successfully deleted airplane';
        SuccessResponse.data=airplane;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        ErrorResponse.message=error.message;
        return res
        .status(error.statuscode)
        .json(ErrorResponse);
    }
}
module.exports = {
    createairplane,
    getAirplanes,
    getAirplane,
    updateAirplane,
    destroyAirplane
};