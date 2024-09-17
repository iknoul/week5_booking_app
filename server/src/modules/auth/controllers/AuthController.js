const passport = require('passport');
const twilio = require('../../../services/twilio')
const otpService = require('./../../../services/otpService')
const jwt = require('./../../../services/jwt-servise')
const checkToken = require('./../middlewares/checkToken')
const Admin = require('./../../admin/models/admin-schema')

// Google login route handler
exports.googleLogin = passport.authenticate('google', {scope:['profile', 'email']})

// Google OAuth callback handler
exports.googleCallback = (req, res) => {
  const token = req.user.token;
  const origin = req.headers.origin || 'http://localhost:3000'; // Fallback if origin is missing
  res.redirect(`${origin}/Login/?token=${token}`);
};

exports.sentOtp = async (req, res, next) => 
{ 
  try 
  {
      const { mobile_number } = req.body;
      const otp = otpService.generateOTP(mobile_number);
      console.log(otp, "thid is otp",mobile_number)
      // await whatsapp.sendMsg(mobile_number, `Your OTP Code: \nYour OTP code is ${otp}`);
      // await twilio.sendSms(mobile_number, otp)
      return res.status(200).send('OTP sent successfully');
  } 
  catch (error) 
  {
      return res.status(501).send('failed'); 
  }
}

exports.verifyOTP = async(req, res, next) => {
  const { mobile_number, OTP, user} = req.body;
  console.log(user, 'user must jherer')
   
  if (otpService.verifyOTP(mobile_number, OTP)) {

      const admin = await Admin.findOne({email: user.email})
      let registrationToken = null

      if(admin)
      {
        registrationToken = jwt.createToken({ user, stage:'otpVerified', role:'admin'})
      }
      else
      {
        registrationToken = jwt.createToken({ user, stage:'otpVerified', role:'user'})
      } 
     
      // const updatedUser = await User.findOneAndUpdate(
      //     { email: email }, // Find the user by email
      //     {
      //       $set: {
      //         ...(mobile_number && { mobile_number }), // Update mobile number if provided
      //       },
      //     },
      //   ); 

      return res
          .status(200)
          .json({success:true, message:'mobile verification succesfull',registrationToken})      
          
  } else {
      return res.status(401).send('Invalid or expired OTP');
  }
};

exports.logout = (req, res) => {
  const bToken = req.headers.authorization
  checkToken.blacklistedTokens.add(bToken);
  res.status(200).json({ message: 'Logged out successfully' });
};
