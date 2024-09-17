const express = require('express');
const router = express.Router();


// router.get('/callback', passport.authenticate('google', { session: false }), authController.googleCallback);

const AdminController = require('./../controllers/AdminController')

router.post('/add-movie',  AdminController.addMovieController);
router.post('/add-theater',  AdminController.addTheaterController);
router.post('/add-show-time', AdminController.addShowController)



module.exports = router;
