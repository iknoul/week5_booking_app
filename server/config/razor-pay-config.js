const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: 'rzp_test_OZZv3kK0jph7j5', // Replace with your Razorpay Key ID
    key_secret: '6DWB2BLDg4ZBUZLuypoHFKuW' // Replace with your Razorpay Secret Key
});


// Create Order
exports.createOrder = async (req, res) => {
	try {
		const { amount } = req.body; // amount in the smallest currency unit (e.g., paise for INR)

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
