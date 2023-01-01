const express = require('express');
const router = express.Router();
const homeC = require('../controllers/home.c');

router.get('/', homeC.homePage);

module.exports = router;