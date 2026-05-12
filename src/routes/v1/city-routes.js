const express = require('express');
const {cityController} = require('../../controllers');
const {cityMiddlewares} = require('../../middlewares');
const router = express.Router();

router.post('/',cityMiddlewares.validateCreateRequest,cityController.createCity);
router.patch('/:id',cityController.updateCity);
router.delete('/:id',cityController.destroyCity);
module.exports=router;