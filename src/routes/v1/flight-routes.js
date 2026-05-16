const express = require('express');
const { flightController } = require('../../controllers');
const { flightMiddlewares }=require('../../middlewares');
const router = express.Router();

router.post('/', flightMiddlewares.validateCreateRequest,flightController.createFlight);
module.exports = router;