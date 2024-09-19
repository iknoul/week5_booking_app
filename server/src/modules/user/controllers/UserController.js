const userRepository = require('./../repository/user-repository');
const whatsapp = require('./../../../../utils/whatsapp')

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


const getUpperCaseLetters = () => {
    const letters = [];
    for (let i = 65; i <= 90; i++) { // 65 is 'A' and 90 is 'Z'
    letters.push(String.fromCharCode(i));
    }
    return letters;
};


exports.verifyOrderController = async (req, res) => {
    
    const uppercaseLetters = getUpperCaseLetters();
    
    try {
        const { showtimeId, seatDetails, showTimeData, theaterName, theaterLocation, movieName } = req.body;

        
        let msg = (`Thanks for Booking with Us. 
        \n${movieName}\nThaeater: ${theaterName}\nLocation: ${theaterLocation}\nDate: ${showTimeData.date}\nTime: ${showTimeData.time}
        \nyour seats are:`)
        // Create new seat and add reference to showtime
        for(let i=0; i<seatDetails.length;i++){
            console.log(seatDetails[i] / 10)
            msg = msg + ` ${uppercaseLetters[Math.floor(seatDetails[i] / 10)]}${seatDetails[i] % 10}`
            console.log(seatDetails)
            console.log({number:seatDetails[i]})
            const newSeat = await userRepository.createSeat({number:seatDetails[i]});
            console.log(showTimeData, showTimeData._id)
            await userRepository.addSeatToShowtime(showTimeData._id, newSeat._id);
        }
        msg = msg+'\n\n book again ...'
        whatsapp.sendMsg('8943788919', msg)

        res.status(201).json({ message: 'Seat booked successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
