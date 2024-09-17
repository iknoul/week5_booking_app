const Theater = require('../../Theater/models/theater-schema');
const Movie = require('../../movie/models/movie-schema');
const Showtime = require('../../Theater/models/show-time-schema');
const Seat = require('../../Theater/models/seat-schema');

exports.getMoviesByTheater = async (theaterId) => {
    try {
        const showtimes = await Showtime.find({ theater: theaterId }).populate('movie');
        return showtimes.map(showtime => showtime.movie);
    } catch (error) {
        throw new Error(`Error fetching movies by theater: ${error.message}`);
    }
};

exports.getTheaterByMovie = async (movieId) => {
    try {
        const showtimes = await Showtime.find({ movie: movieId }).populate('theater');
        return showtimes.map(showtime => showtime.theater);
    } catch (error) {
        throw new Error(`Error fetching theaters by movie: ${error.message}`);
    }
};

exports.getShowtime = async (showtimeId) => {
    try {
        return await Showtime.findById(showtimeId).populate('movie').populate('theater');
    } catch (error) {
        throw new Error(`Error fetching showtime: ${error.message}`);
    }
};

exports.createSeat = async (seatDetails) => {
    try {
        const newSeat = new Seat(seatDetails);
        return await newSeat.save();
    } catch (error) {
        throw new Error(`Error creating seat: ${error.message}`);
    }
};

exports.addSeatToShowtime = async (showtimeId, seatId) => {
    try {
        return await Showtime.findByIdAndUpdate(
            showtimeId,
            { $push: { bookedSeats: seatId } },
            { new: true }
        );
    } catch (error) {
        throw new Error(`Error adding seat to showtime: ${error.message}`);
    }
};
