const crypto = require('crypto');

const otps = {}; // Temporary in-memory store

exports.generateOTP = (mobile) => {
    const otp = crypto.randomInt(100000, 999999).toString();
    otps[mobile] = { otp, expires: Date.now() + 300000 }; // OTP expires in 5 minutes
    return otp;
};

exports.verifyOTP = (mobile, otp) => {
    
    // console.log(otp)
    // if (!otps[mobile]) {
    //     return false;
    // }
    // if (otps[mobile].expires < Date.now()) {
    //     console.log("now here")
    //     delete otps[email];
    //     return false;
    // }
    // if (otps[mobile].otp == otp) {
    //     delete otps[mobile];
    //     return true;
    // }
    // return false;
    return true
};
