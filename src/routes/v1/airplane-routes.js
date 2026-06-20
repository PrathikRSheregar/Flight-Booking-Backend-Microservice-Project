const express = require('express');
const { airplaneController } = require('../../controllers');
const { airplaneMiddlewares,authRequestMiddlewares }=require('../../middlewares');
const router = express.Router();

router.post('/', authRequestMiddlewares.isAdmin,airplaneMiddlewares.validateCreateRequest,airplaneController.createAirplane);
router.get('/',airplaneController.getAirplanes);
router.get('/:id',airplaneController.getAirplane);
router.patch('/:id',authRequestMiddlewares.isAdmin,airplaneController.updateAirplane);
router.delete('/:id',authRequestMiddlewares.isAdmin,airplaneController.destroyAirplane);
module.exports = router;