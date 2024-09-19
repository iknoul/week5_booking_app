const mongoose = require('mongoose');
const Theater = require('../models/theater-schema');
const Showtime = require('./../models/show-time-schema'); // Assuming the model file name
const Seat = require('./../models/seat-schema'); // Import your Seat model


exports.getTheater = (req, res) => {
    const { name, location, id } = req.query;
    console.log(id)

    // Build aggregation pipeline
    const pipeline = [];

    // If name is provided, match theaters with that name
    if (name) {
        pipeline.push({
            $match: {
                name: { $regex: name, $options: 'i' } // Case-insensitive name search
            }
        });
    }

    // If location is provided, match theaters with that location
    if (location) {
        pipeline.push({
            $match: {
                location: { $regex: location, $options: 'i' } // Case-insensitive location search
            }
        });
    }

    // If id is provided, match the exact ObjectId
    if (id) {
        pipeline.push({
            $match: {
                _id: new mongoose.Types.ObjectId(id) // Match the exact ObjectId
            }
        });
    }

    // Execute the aggregation pipeline
    Theater.aggregate(pipeline)
        .then((theater) => {
            res.status(200).json({
                status: 'success',
                data: theater
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        });
};



exports.getShowtimes = async (req, res) => {
    const { theaterId, movieId, date } = req.body;

    console.log('quary herreee',  theaterId, movieId, date)

    try {
        // Convert date to string if it's provided
        const formattedDate = date ? new Date(date).toISOString().split('T')[0] : undefined;

        // Create a query object
        const query = {};
        // Add filters to query object if they exist
        if (theaterId) query.theaterId = new mongoose.Types.ObjectId(theaterId);
        if (movieId) query.movieId = new mongoose.Types.ObjectId(movieId);
        if (formattedDate) query.date = String(formattedDate);
        
        console.log( query.date, "date converted to string")
        console.log('', query)

        // Fetch showtimes based on the provided theaterId, movieId, and formatted date
        const showtimes = await Showtime.find(query).exec();

        res.status(200).json({
            status: 'success',
            data: showtimes,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};

exports.getSeatDetails = async (req, res) =>{
  
    const { seatIds } = req.query;

    if (!seatIds || !Array.isArray(seatIds)) {
        return res.status(400).json({ status: 'error', message: 'Invalid seat IDs' });
    }

    try {
        // Fetch only seat numbers
        const seats = await Seat.find(
            { _id: { $in: seatIds } },
            { number: 1, _id: 0 } // Project only the `number` field, exclude `_id`
        ).exec();

        // Map to extract seat numbers
        const seatNumbers = seats.map(seat => seat.number);

        res.status(200).json({
            status: 'success',
            data: seatNumbers
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

