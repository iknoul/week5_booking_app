const express = require('express');
const payment = require('./../../../../config/razor-pay-config')

const router = express.Router();


// router.get('/callback', passport.authenticate('google', { session: false }), authController.googleCallback);

const UserController = require('./../controllers/UserController')

router.post('/get-movies-by-theater', UserController.getMoviesByTheaterController);
router.post('/get-theater-by-movie', UserController.getTheaterByMovieController);
router.post('/get-showtime', UserController.getShowtimeController);
router.post('/create-order', payment.createOrder);
router.post('/verify-payment', payment.verifyPayment, UserController.verifyOrderController)



module.exports = router;
