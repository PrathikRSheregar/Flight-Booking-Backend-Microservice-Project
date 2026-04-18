const express = require('express');
const { createairplane } = require('../controllers');

const router = express.Router();

router.post('/', createairplane);

module.exports = router;