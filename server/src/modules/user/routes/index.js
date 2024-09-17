const express = require('express');
const router = express.Router();


// router.get('/callback', passport.authenticate('google', { session: false }), authController.googleCallback);

const UserController = require('./../controllers/UserController')

router.post('/book-movie',  UserController.addMovieController);
router.post('/add-theater',  UserController.addTheaterController);



module.exports = router;
