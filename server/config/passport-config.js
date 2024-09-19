const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwtService = require('../src/services/jwt-servise');


// Replace with your actual OAuth provider configuration
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'http://localhost:8888/auth/google-callback',
  	scope: ['email', 'profile'],
}, (accessToken, refreshToken, profile, done) => {
	const user = {
		id: profile.id,
		name: profile.displayName || 'No Name',
		profile_pic: profile.photos[0],
		email: profile.emails ? profile.emails[0].value : 'No Email',
  	};
	console.log(user)
	const token = jwtService.createToken({user, step:['oAuthDone']});
	done(null, { user, token });
}));

// passport.initialize();
module.exports = passport;
   