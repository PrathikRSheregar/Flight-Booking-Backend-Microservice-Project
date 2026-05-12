const { errorResponse } = require('../utils/common');

const StatusCodes=require('http-status-codes');

function validateCreateRequest(req,res,next){
    if(!req.body.name)
    {
    errorResponse.message='Something went wrong while creating city';
    errorResponse.error=['city not found on the incoming request'];
    res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse)
    }
 next();
}
module.exports={
    validateCreateRequest
};
