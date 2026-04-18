const { StatusCodes } = require('http-status-codes');
const { airplaneService } = require('../services');

async function createairplane(req, res) {
    try {
        const airplane = await airplaneService.createairplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: airplane
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createairplane
};