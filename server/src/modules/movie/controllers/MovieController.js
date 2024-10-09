const Movie = require('./../models/movie-schema')
const Showtime = require('../../Theater/models/show-time-schema');

exports.getMovie = (req, res) => {
    const { title, genre, minRating, maxRating, sortByRating, showDate, showTime, theaterName, limit = 10  } = req.body;
    
    // Build aggregation pipeline
    const pipeline = [];

    // If a theater name is provided, match movies with that theater
    if (theaterName) {
        pipeline.push({
            $lookup: {
                from: 'theaters', // The name of the theaters collection
                localField: 'Theater', // The field in movies that references the theater
                foreignField: '_id', // The field in theaters collection that is matched (usually _id)
                as: 'theater' // The name of the output array in the result
            }
        });

        pipeline.push({
            $match: {
                'theater.name': { $regex: theaterName, $options: 'i' } // Match theater name (case-insensitive)
            }
        });
    }

    // If genre is provided, match movies with that genre
    if (genre) {
        pipeline.push({
            $match: {
                Genre: { $regex: `\\b${genre}\\b`, $options: 'i' } // Case-insensitive regex match for the genre
            }
        });
    }

    // If title is provided, add it to the match stage
    if (title) {
        pipeline.push({
            $match: {
                Title: { $regex: title, $options: 'i' } // Case-insensitive title search
            }
        });
    }

    // If showDate and showTime are provided, match movies with showtimes
    if (showDate || showTime) {
        console.log('here the dadte', showDate)
        pipeline.push({
            $lookup: {
                from: 'showtimes', // The name of the showtimes collection
                localField: '_id', // Movie ID in the Movie schema
                foreignField: 'movieId', // Movie ID in the Showtime schema
                as: 'showtimes' // The name of the output array in the result
            }
        });

        const showtimeMatch = {};
        if (showDate) {
            showtimeMatch['showtimes.date'] = showDate; // Match specific show date
            console.log('here the showDate', showDate)
        }
        if (showTime) {
            showtimeMatch['showtimes.time'] = showTime; // Match specific show time
        }

        pipeline.push({
            $match: showtimeMatch
        });
    }


    // If minRating and/or maxRating are provided, filter movies by rating
    if (minRating !== undefined || maxRating !== undefined) {
        pipeline.push({
            $match: {
                imdbRating: {
                    ...(minRating !== undefined && { $gte: minRating }), // Greater than or equal to minRating
                    ...(maxRating !== undefined && { $lte: maxRating })  // Less than or equal to maxRating
                }
            }
        });
    }

    // If sortByRating is provided, sort movies by rating
    if (sortByRating===true) {
        console.log(sortByRating, "vyf ===== ")
        pipeline.push({
            $sort: {
                imdbRating: -1 // 1 for ascending, -1 for descending
            }
        });
    }

     // Limit to 10 items when searching by genre
     pipeline.push({
        $limit: limit
    });

    // Execute the aggregation pipeline
    Movie.aggregate(pipeline)
        .then((movies) => {
            res.status(200).json({
                status: 'success',
                data: movies
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        });
};
