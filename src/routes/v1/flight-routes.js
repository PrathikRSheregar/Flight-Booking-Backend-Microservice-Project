const express = require('express');
const { flightController } = require('../../controllers');
const { flightMiddlewares, authRequestMiddlewares }=require('../../middlewares');
const router = express.Router();

router.post('/',authRequestMiddlewares.isFlightCompany,flightMiddlewares.validateCreateRequest,flightController.createFlight);
router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlight);
router.patch(
    '/:id/seats',
    flightMiddlewares.validateUpdateSeatsRequest,
    flightController.updateSeats
);
module.exports = router;