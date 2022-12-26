const express = require('express');
const router = express.Router();
const signupC = require('../controllers/signup.c');

router.get('/', signupC.loadSignupPage);
router.post('/', signupC.signupUser);
module.exports = router;