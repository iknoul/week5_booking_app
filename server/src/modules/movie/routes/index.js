const express = require('express');
const router = express.Router();


// router.get('/callback', passport.authenticate('google', { session: false }), authController.googleCallback);

const MovieController = require('./../controllers/MovieController')

router.post('/getMovie',  MovieController.getMovie);


module.exports = router;
