const express = require('express');
const { airplaneController } = require('../../controllers');
const { airplaneMiddlewares }=require('../../middlewares');
const router = express.Router();

router.post('/', airplaneMiddlewares.validateCreateRequest,airplaneController.createAirplane);
router.get('/',airplaneController.getAirplanes);
router.get('/:id',airplaneController.getAirplane);
router.patch('/:id',airplaneController.updateAirplane);
router.delete('/:id',airplaneController.destroyAirplane);
module.exports = router;