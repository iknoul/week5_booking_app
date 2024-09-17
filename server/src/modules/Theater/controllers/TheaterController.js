const Theater = require('../models/theater-schema')

exports.getTheater = (req, res) => {
    const { name, location } = req.query;

    // Build aggregation pipeline
    const pipeline = [];

    // If genre is provided, match movies with that genre
    if (name) {
        pipeline.push({
            $match: {
                name: { $regex: name } // Check if the movie's genre is in the requested genres array
            }
        });
    }

    // If title is provided, add it to the match stage
    if (location) {
        pipeline.push({
            $match: {
                location: { $regex: location, $options: 'i' } // Case-insensitive title search
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
