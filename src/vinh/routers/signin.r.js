const express = require('express');
const router = express.Router();
const loginC = require('../controllers/signin.c');
const passport = require('passport');

router.get('/', loginC.loadSigninPage);
router.post('/', passport.authenticate('local'),loginC.signinUser);
module.exports = router;