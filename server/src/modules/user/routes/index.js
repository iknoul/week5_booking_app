const express = require('express');
const router = express.Router();


// router.get('/callback', passport.authenticate('google', { session: false }), authController.googleCallback);

const UserController = require('./../controllers/UserController')

router.post('/get-movies-by-theater', UserController.getMoviesByTheaterController);
router.post('/get-theater-by-movie', UserController.getTheaterByMovieController);
router.post('/get-showtime', UserController.getShowtimeController);
router.post('/book-movie', UserController.bookMovieController);



module.exports = router;
