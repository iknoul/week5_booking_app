const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model


const ShowtimeSchema = new Schema({
  movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  theater: { type: Schema.Types.ObjectId, ref: 'Theater', required: true },
  time: { type: Date, required: true },
  bookedSeats: [{ type: Schema.Types.ObjectId, ref: 'Seat' }], // References Seat model
});

const Showtime = model('showtimes', ShowtimeSchema);

module.exports = Showtime
