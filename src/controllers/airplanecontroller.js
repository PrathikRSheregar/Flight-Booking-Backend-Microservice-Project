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
        return res
        .status(error.statuscode)
        .json(ErrorResponse);
    }
}

module.exports = {
    createairplane
};