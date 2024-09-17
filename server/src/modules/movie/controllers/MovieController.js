const Movie = require('./../models/movie-schema')

exports.getMovie = (req, res) => {
    const { title, genre, minRating, maxRating, sortByRating, limit = 10  } = req.body;
    
    // Build aggregation pipeline
    const pipeline = [];

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

    // Limit to 10 items when searching by genre
    pipeline.push({
        $limit: limit
    });

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
    if (sortByRating) {
        pipeline.push({
            $sort: {
                imdbRating: sortByRating // 1 for ascending, -1 for descending
            }
        });
    }

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
