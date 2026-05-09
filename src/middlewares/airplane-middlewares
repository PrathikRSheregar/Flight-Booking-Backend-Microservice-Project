const { errorResponse } = require('../utils/common');

const StatusCodes=require('http-status-codes');

function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber)
    {
    errorResponse.message='Something went wrong while creating airplane';
    errorResponse.error=['modelNumber not found on the incoming request'];
    res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
 next();
}
module.exports={
    validateCreateRequest
};
