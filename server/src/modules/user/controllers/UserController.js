const userRepository = require('./../repository/user-repository');

exports.getMoviesByTheaterController = async (req, res) => {
    try {
        const { theaterId } = req.body;
        const movies = await userRepository.getMoviesByTheater(theaterId);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTheaterByMovieController = async (req, res) => {
    try {
        const { movieId } = req.body;
        const theaters = await userRepository.getTheaterByMovie(movieId);
        res.status(200).json(theaters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getShowtimeController = async (req, res) => {
    try {
        const { showtimeId } = req.body;
        const showtime = await userRepository.getShowtime(showtimeId);
        res.status(200).json(showtime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.bookMovieController = async (req, res) => {
    try {
        const { showtimeId, seatDetails } = req.body;

        // Create new seat and add reference to showtime
        const newSeat = await userRepository.createSeat(seatDetails);
        await userRepository.addSeatToShowtime(showtimeId, newSeat._id);

        res.status(201).json({ message: 'Seat booked successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
