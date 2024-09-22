const express = require('express');
const router = express.Router();
const passport = require('passport')

const checkTokenMiddleWare = require('../../../middlewares/checkToken')
const validateMiddleWare = require('../../../middlewares/validateMiddleware')

// const { authenticateJWT } = require('../middleware/authMiddleware');
//import controller files
const AuthController = require('../controllers/AuthController')


router.get('/google-auth', AuthController.googleLogin)

router.get('/google-callback',
    passport.authenticate('google', { session: false }), 
    AuthController.googleCallback
)

router.post('/callback', passport.authenticate('google', { session: false }), AuthController.googleCallback);


router.post('/send-otp', 
    checkTokenMiddleWare.checkToken(['otpVerified'], true),
    validateMiddleWare.validateMobile_no, 
    AuthController.sentOtp
)

router.post('/verify-otp',
    checkTokenMiddleWare.checkToken(),
    validateMiddleWare.validateOtp,
    AuthController.verifyOTP
)

router.post('/logout',
    checkTokenMiddleWare.checkToken(),
    AuthController.logout
)

module.exports = router;
