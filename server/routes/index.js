// const express = require('express');
// const router = express.Router();
// const auth = require('../controllers/authController')
// const jwt = require('jsonwebtoken');

// const JWT_SECRET = '@cbdce722v23eiuk231';

// const dotenv = require('dotenv');


// // const registration = require('./registration')

// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client('93368005434-ktag062d902ure0hh6q7rpen0rkkja2i.apps.googleusercontent.com');

// async function verifyToken(token, req, res) {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     console.log(payload)
//     if(payload){
//         res.status(200).json({result:'success', payload})
//     }
//     else{
//         res.status(400)
//     }
// }

// // router.use('/registration', registration)

// router.post('/google-auth', (req, res) => {
//     const { token } = req.body;
//     jwt.verify(token, JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.status(403).json({ message: 'Token is not valid' });
//       }
//       res.status(200).json({ message: 'Login successful', user });
//     });
//   });

// router.use('/auth', auth )

// module.exports = router;
 