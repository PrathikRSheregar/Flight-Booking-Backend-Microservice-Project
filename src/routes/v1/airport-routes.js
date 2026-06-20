const express = require('express');
const { airportController } = require('../../controllers');
const { airportMiddlewares,authRequestMiddlewares }=require('../../middlewares');
const router = express.Router();

router.post('/',authRequestMiddlewares.isAdmin,airportMiddlewares.validateCreateRequest,airportController.createAirport);
router.get('/',airportController.getAirports);
router.get('/:id',airportController.getAirport);
router.patch('/:id',authRequestMiddlewares.isAdmin,airportController.updateAirport);
router.delete('/:id',authRequestMiddlewares.isAdmin,airportController.destroyAirport);
module.exports = router;