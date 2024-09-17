import mongoose from 'mongoose';

const SeatSchema = new mongoose.Schema({
  number: { type: String, required: true },
  userId: {type: String, required: true }
});

const Seat = mongoose('seats', SeatSchema);
export default Seat;
