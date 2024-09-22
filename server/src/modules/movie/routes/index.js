const express = require('express');
const router = express.Router();

const MovieController = require('./../controllers/MovieController')

router.post('/getMovie',  MovieController.getMovie);


module.exports = router;
