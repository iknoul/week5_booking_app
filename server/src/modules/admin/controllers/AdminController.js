
const adminRepository = require('./../repository/admin-repository')

exports.addMovieController = async (req, res) => {
    try {
        // Extract data from the request body
        const { Title, Runtime, Genre, Language, Actors, Poster, Plot, imdbRating, Director, Writer } = req.body.movie;

        // Prepare movie data
        const movieData = {
            Title,
            Runtime,
            Genre, // expecting an array of genres (e.g., ['Action', 'Comedy'])
            Language,
            Actors,
            Poster,
            Plot,
            imdbRating:Number(imdbRating),
            Director,
            Writer,
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
        const { movieId, theaterId, time, startDate, endDate } = req.body.data;

        // Validate input
        if (!movieId || !theaterId || !time || !startDate || !endDate) {
            return res.status(400).json({ message: 'Movie ID, Theater ID, time, start date, and end date are required.' });
        }

        // Parse and validate date
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ message: 'Invalid start date or end date.' });
        }

        if (start > end) {
            return res.status(400).json({ message: 'Start date cannot be after end date.' });
        }

        // Check if the movie and theater exist
        const movie = await adminRepository.findMovieById(movieId);
        const theater = await adminRepository.findTheaterById(theaterId);

        if (!movie || !theater) {
            return res.status(404).json({ message: 'Movie or Theater not found.' });
        }

        // Add showtimes for each date between start and end date
        let currentDate = start;
        const showtimes = [];

        while (currentDate <= end) {
            const formattedDate = currentDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
            const showtimeData = {
                movieId,
                theaterId,
                time,
                date: formattedDate
            };

            // Create showtime and add to array
            const newShowtime = await adminRepository.addShowtime(showtimeData);
            showtimes.push(newShowtime);

            // Add theater to the movie's theater array if it's not already present
            if (!movie.Theater.includes(theaterId)) {
                movie.Theater.push(theaterId);
                await movie.save();
            }

            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Send success response
        res.status(201).json({
            status: 'success',
            data: showtimes
        });
    } catch (error) {
        // Handle errors
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};
