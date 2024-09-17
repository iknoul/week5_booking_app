// const jwt = require('jsonwebtoken');
// const express = require('express');
// const router = express.Router();
// const dotenv = require('dotenv');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// // Load environment variables
// dotenv.config();

// // Replace with your actual OAuth provider configuration
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const JWT_SECRET = '@cbdce722v23eiuk231';

// // Configure Passport to use Google OAuth strategy
// passport.use(new GoogleStrategy({
//   clientID: CLIENT_ID,
//   clientSecret: CLIENT_SECRET,
//   callbackURL: 'http://localhost:8888/auth/google-callback',
//   scope: ['email', 'profile'],  // Add the scope here
// },
// function(accessToken, refreshToken, profile, done) {
//   // Create JWT here
//   console.log('Access Token:', accessToken);
//   console.log('Refresh Token:', refreshToken);
//   console.log('Profile:', profile);

//   const user = {
//     id: profile.id,
//     name: profile.displayName || 'No Name',
//     email: profile.emails ? profile.emails[0].value : 'No Email'
//   };
//   const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
//   done(null, { user, token });
// }));

// // Initialize Passport
// passport.initialize();

// router.get('/', (req, res) => {
//   console.log('assaas ::::::::>>>');
//   res.status(200).send('hf');
// });

// router.get('/auth', (req, res, next) => {
//   console.log('here ---->>>>>');
//   next();
// }, passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/callback', passport.authenticate('google', { session: false }), (req, res) => {
//   const token = req.user.token;

//   // Get the origin from the request header
//   const origin = req.headers.origin ;  // Fallback to localhost if origin is missing

//   // Redirect dynamically to the origin with the token
//   res.redirect(`${origin}?token=${token}`);
// });

// router.post('/callback', passport.authenticate('google', { session: false }), (req, res) => {
//   // Redirect or send JWT to the frontend
//   res.json({ token: req.user.token });
// });

// // Middleware to protect routes
// function authenticateJWT(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// }

// // Protected route example
// router.get('/protected', authenticateJWT, (req, res) => {
//   res.json({ message: 'You are authenticated!', user: req.user });
// });

// module.exports = router;
