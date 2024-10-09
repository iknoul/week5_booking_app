const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const Seats = require('./seat-schema');



const ShowtimeSchema = new Schema({
	movieId: { 
		type: Schema.Types.ObjectId, 
		ref: 'Movie', required: true 
	},

	theaterId: { 
		type: Schema.Types.ObjectId, 
		ref: 'Theater', required: true 
	},

	date: {
		type: String,  // Storing the date as 'YYYY-MM-DD'
		required: true
	},

	time: {
		type: String,  // Storing the time as 'HH:mm'
		required: true
	},

	bookedSeats: [
		{ type: Schema.Types.ObjectId, 
		ref: 'Seat' }
	], // References Seat model
});

const Showtime = model('showtimes', ShowtimeSchema);

module.exports = Showtime
