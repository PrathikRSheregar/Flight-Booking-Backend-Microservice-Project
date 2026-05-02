const express = require('express');
const { airplanecontroller } = require('../../controllers');
const {airplanemiddlewares}=require('../../middlewares');
const { validateCreateRequest } = require('../../middlewares/airplanemiddlewares');
const router = express.Router();

router.post('/', airplanemiddlewares.validateCreateRequest,airplanecontroller.createairplane);
router.get('/',airplanecontroller.getAirplanes);
router.get('/:id',airplanecontroller.getAirplane);
router.delete('/:id',airplanecontroller.destroyAirplane);
module.exports = router;