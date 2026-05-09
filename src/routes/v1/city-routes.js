const express = require('express');
const {cityController} = require('../../controllers');
const router = express.Router();

router.post('/',cityController.createCity);
router.patch('/:id',cityController.updateCity);
router.delete('/:id',cityController.destroyCity);
module.exports=router;