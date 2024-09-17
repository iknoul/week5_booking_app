const Theater = require('./../../Theater/models/theater-schema')
const Movie = require('./../../movie/models/movie-schema')
const Showtime = require('./../../Theater/models/show-time-schema');

exports.addTheater = async (theaterData) => {
    try {
        console.log(theaterData)
        const theater = new Theater(theaterData);
        await theater.save();
        console.log('Theater added successfully');
    } catch (error) {
        console.error('Error adding theater:', error);
    }
};


exports.addMovie = async (movieData) => {
    try {
        // Create a new movie instance
        const newMovie = new Movie(movieData);

        // Save the movie to the database
        await newMovie.save();

        return newMovie; // Return the saved movie instance
    } catch (error) {
        console.error('Error adding movie:', error);
        throw error; // Rethrow the error to be handled by the controller
    }
};

exports.addShowtime = async (showtimeData) => {
    const newShowtime = new Showtime(showtimeData);
    return await newShowtime.save();
};

exports.findMovieById = async (movieId) => {
    return await Movie.findById(movieId);
};

exports.findTheaterById = async (theaterId) => {
    return await Theater.findById(theaterId);
};