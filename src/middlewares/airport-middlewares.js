const { errorResponse } = require('../utils/common');

const StatusCodes=require('http-status-codes');

function validateCreateRequest(req,res,next){
    if(!req.body.name)
    {
    errorResponse.message='Something went wrong while creating airport';
    errorResponse.error=['name not found on the incoming request'];
    res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
    if(!req.body.code)
    {
    errorResponse.message='Something went wrong while creating airport';
    errorResponse.error=['airport code not found on the incoming request'];
    res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
    if(!req.body.cityId)
    {
    errorResponse.message='Something went wrong while creating airport';
    errorResponse.error=['airport cityId not found on the incoming request'];
    res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
 next();
}
module.exports={
    validateCreateRequest
};
