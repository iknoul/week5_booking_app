import axios from "@/utils/axios";
import { useAuth } from "../hooks/useAuth";


interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}
interface Window {
    Razorpay: any; // You can replace 'any' with a more specific type if you have one
}
interface payment {
    amountToBePaid: Number;
    seatDetails: number[];
    showtimeId: string;
    setSuccess: Function;
    setFail: Function;
    showTimeData: object;
    theaterName:string;
    theaterLocation: string;
    movieName?: string;
}

const handlePayment = async ({amountToBePaid, seatDetails, showtimeId, setSuccess, setFail, showTimeData, theaterName, theaterLocation, movieName}:payment) => {

  const { token } = useAuth() 
  
    try {
      // Request the server to create an order
      const { data } = await axios.post('user/create-order', { amount: amountToBePaid }); // Amount in smallest currency unit (e.g., 500 paise = 5 INR)
  
      const { orderId, amount } = data.data;
  
      const options = {
        key: 'rzp_test_OZZv3kK0jph7j5', // Your Razorpay Key ID
        amount: amount,
        currency: 'INR',
        name: 'Book your ticket',
        description: 'dont refersh this page, it will automaitcally redirect .. ',
        order_id: orderId,
        handler: async (response: RazorpayResponse) => {
          // Verify the payment on the server
          await axios.post('user/verify-payment', {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            seatDetails,
            showtimeId,
            showTimeData,
            theaterName,
            theaterLocation,
            movieName
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Token from props
            },
          });
          // Payment verified successfully
          // alert('Payment Successful');
          setSuccess(true)
          setTimeout(()=>{setSuccess(false)}, 5000)
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '1234567890',
        },
      };
  
      // Ensure Razorpay is loaded
      if (window.Razorpay) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        console.error('Razorpay SDK not loaded');
        setFail(true)
        setTimeout(()=>{setFail(false)}, 2500)
      }
    } catch (error) {
      setFail(true)
      setTimeout(()=>{setFail(false)}, 2500)
      console.error('Payment initiation failed:', error);
      throw error
    }
  };

  export default handlePayment