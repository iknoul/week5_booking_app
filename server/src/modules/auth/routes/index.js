const express = require('express');
const router = express.Router();
const passport = require('passport')

const checkTokenMiddleWare = require('./../middlewares/checkToken')
const validateMiddleWare = require('./../middlewares/validateMiddleware')

// const { authenticateJWT } = require('../middleware/authMiddleware');
//import controller files
const AuthController = require('../controllers/AuthController')


router.get('/google-auth', AuthController.googleLogin)

router.get
('/google-callback',
     passport.authenticate('google', { session: false }), 
     AuthController.googleCallback
)

router.post
(
    '/sent-otp', 
    // checkTokenMiddleWare.checkToken(['otpVerified'], not=true),
    // validateMiddleWare.validateMobile_no, 
    AuthController.sentOtp
)

router.post
(
    '/verify-otp',
    checkTokenMiddleWare.checkToken(),
    // validateMiddleWare.validateOtp,
    AuthController.verifyOTP
)



// router.get('/auth', authController.googleLogin);
// router.get('/callback', passport.authenticate('google', { session: false }), authController.googleCallback);
router.post('/callback', passport.authenticate('google', { session: false }), AuthController.googleCallback);

// Protected route
// router.get('/protected', authenticateJWT, authController.protectedRoute);

module.exports = router;
