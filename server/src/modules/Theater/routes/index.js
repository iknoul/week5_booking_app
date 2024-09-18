const express = require('express');
const router = express.Router();


// router.get('/callback', passport.authenticate('google', { session: false }), authController.googleCallback);

const TheaterController = require('./../controllers/TheaterController')

router.get('/getTheater',  TheaterController.getTheater);
router.post('/show-time', TheaterController.getShowtimes)
router.get('/seats', TheaterController.getSeatDetails)


module.exports = router;
