const Razorpay = require('razorpay');
const crypto = require('crypto');
const Showtime = require('../src/modules/Theater/models/show-time-schema');
const Seats = require('../src/modules/Theater/models/seat-schema');


const razorpay = new Razorpay({
    key_id: 'rzp_test_OZZv3kK0jph7j5', // Replace with your Razorpay Key ID
    key_secret: '6DWB2BLDg4ZBUZLuypoHFKuW' // Replace with your Razorpay Secret Key
});


// Create Order
exports.createOrder = async (req, res) => {
	try {
		const { amount, showtimeId, seatDetails } = req.body; // amount in the smallest currency unit (e.g., paise for INR)

		// Fetch the showtime by ID without populating bookedSeats
        const showtime = await Showtime.findById(showtimeId);
        if (!showtime) {
            return res.status(404).json({ status: 'error', message: 'Showtime not found' });
        }

        // If showtime has booked seats, fetch seat numbers directly from the Seat model
        let alreadyBookedSeats = [];
        if (showtime.bookedSeats && showtime.bookedSeats.length > 0) {
            // Fetch seat numbers from Seat model using the bookedSeats array
            const bookedSeatDocs = await Seats.find({ _id: { $in: showtime.bookedSeats } }).select('number');
            alreadyBookedSeats = bookedSeatDocs.map(seat => seat.number); // Extract seat numbers
        }


		// Check if any of the requested seats are already booked
		// const alreadyBookedSeats = showtime.bookedSeats.map(seat => seat.number); // Assuming Seat schema has 'number'
		const conflictingSeats = seatDetails.filter(seatNumber => alreadyBookedSeats.includes(seatNumber));

		if (conflictingSeats.length > 0) {
			return res.status(400).json({
				status: 'error',
				message: `Seats ${conflictingSeats.join(', ')} are already booked.`,
			});
		}

		const order = await razorpay.orders.create({
		amount: amount * 100, // Convert amount to paise
		currency: 'INR',
		receipt: crypto.randomBytes(10).toString('hex'),
		});
		res.status(200).json({
			status: 'success',
			data: {
				orderId: order.id,
				amount: order.amount,
			},
		});
	} catch (error) {
		res.status(500).json({ status: 'error', message: error.message });
	}
};

// Verify Payment
exports.verifyPayment = async (req, res, next) => {
  	const { orderId, paymentId, signature } = req.body;

	try {
		const generatedSignature = crypto
		.createHmac('sha256', '6DWB2BLDg4ZBUZLuypoHFKuW')
		.update(`${orderId}|${paymentId}`)
		.digest('hex');

		if (generatedSignature === signature) {
		next()
		} else {
		res.status(400).json({ status: 'error', message: 'Invalid signature' });
		}
	} catch (error) {
		res.status(500).json({ status: 'error', message: error.message });
	}
};
