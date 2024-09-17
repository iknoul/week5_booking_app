
const adminRepository = require('./../repository/admin-repository')

exports.addMovieController = async (req, res) => {
    try {
        // Extract data from the request body
        const { Title, Runtime, Genre, Language, Actors, Poster, Plot, imdbRating } = req.body.movie;

        // Prepare movie data
        const movieData = {
            Title,
            Runtime,
            Genre, // expecting an array of genres (e.g., ['Action', 'Comedy'])
            Language,
            Actors,
            Poster,
            Plot,
            imdbRating:Number(imdbRating)
        };

        // Call the repository function to add the movie
        const newMovie = await adminRepository.addMovie(movieData);

        // Send success response
        res.status(201).json({
            status: 'success',
            data: newMovie
        });
    } catch (error) {
        // Handle errors (e.g., validation errors)
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};



exports.addTheaterController = async (req, res) => {
    try {
        const theaterData = req.body.theater;
        console.log(theaterData)


        // Validate the incoming data (you can add custom validation logic here)
        if (!theaterData.name || !theaterData.location) {
            return res.status(400).json({ message: 'Theater name and location are required.' });
        }

        // Call the addTheater function and pass the theater data
        await adminRepository.addTheater(theaterData);

        // Send success response
        return res.status(201).json({ message: 'Theater added successfully.' });
    } catch (error) {
        console.error('Error in addTheaterController:', error);

        // Send error response
        return res.status(500).json({ message: 'Error adding theater', error: error.message });
    }
};

exports.addShowController = async (req, res) => {
    try {
        // Extract data from request
        const { movieId, theaterId, time } = req.body;

        // Validate input
        if (!movieId || !theaterId || !time) {
            return res.status(400).json({ message: 'Movie ID, Theater ID, and showtime are required.' });
        }

        // Check if the movie and theater exist
        const movie = await adminRepository.findMovieById(movieId);
        const theater = await adminRepository.findTheaterById(theaterId);

        if (!movie || !theater) {
            return res.status(404).json({ message: 'Movie or Theater not found.' });
        }

        // Create showtime data
        const showtimeData = {
            movie: movieId,
            theater: theaterId,
            time: new Date(time),
        };

        // Add the showtime
        const newShowtime = await adminRepository.addShowtime(showtimeData);

        // Add theater to the movie's theater array if it's not already present
        if (!movie.Theater.includes(theaterId)) {
            movie.Theater.push(theaterId);
            await movie.save();
        }

        // Send success response
        res.status(201).json({
            status: 'success',
            data: newShowtime
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
