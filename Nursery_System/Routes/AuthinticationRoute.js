const express = require('express');
const controller = require('./../Controllers/AuthinticationController');
const router = express.Router();
router.post('/login',controller.login)


module.exports = router;