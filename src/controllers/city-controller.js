const { StatusCodes } = require('http-status-codes');
const {cityService} = require('../services');
const { errorResponse, successResponse } = require('../utils/common');

async function createCity(req, res) {
    try {
        const city = await cityService.createCity({
            name: req.body.name,
        });
        successResponse.message='Successfully create an city';
        successResponse.data=city;

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
async function updateCity(req,res) {
   try{
        const updated_airplane=await cityService.updateCity(req.params.id,{
            name:req.body.name
        });
        successResponse.message='Successfully updated city';
        successResponse.data=updated_airplane;
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
async function destroyCity(req,res){
    try{
        const city=await cityService.destroyCity(req.params.id);
        successResponse.message='Successfully deleted city';
        successResponse.data=city;
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
module.exports={
    createCity,
    updateCity,
    destroyCity
}