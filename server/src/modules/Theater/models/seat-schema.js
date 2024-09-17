const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const SeatSchema = new Schema({
  number: { type: Number, required: true },
  // userId: {type: String, required: true }
});

const Seat = model('seats', SeatSchema);

module.exports = Seat
