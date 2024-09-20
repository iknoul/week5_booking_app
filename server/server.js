const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cron = require('node-cron');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const passport = require('./config/passport-config')

const db = require('./db');
const deleteOutdatedShowtimes = require('./utils/cleanShowTimes'); // Adjust path as needed

// Remove out dated show times and associated seats
	deleteOutdatedShowtimes()
	
// Schedule the cleanup task to run daily at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running scheduled task to delete outdated showtimes...');
    deleteOutdatedShowtimes();
});


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

const checkToken = require('./src/middlewares/checkToken')

// Import routes
const authRoutes = require('./src/modules/auth/routes')
const movieRoute = require('./src/modules/movie/routes')
const adminRoute = require('./src/modules/admin/routes')
const userRoute = require('./src/modules/user/routes')
const theaterRoute = require('./src/modules/Theater/routes')

// Use routes
app.use('/auth', authRoutes);
app.use('/movie', movieRoute)
app.use('/admin', checkToken.checkToken(undefined, undefined, role='admin'), adminRoute)
app.use('/user', checkToken.checkToken(undefined, undefined, undefined, needMobile=true), userRoute)
app.use('/theater', theaterRoute)



const server = app.listen(process.env.PORT || 8888, () => {
  	console.log(`Express running → On PORT : ${server.address().port}`);
});
