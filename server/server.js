const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const passport = require('./config/passport-config')
const db = require('./db');


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());


// Import routes
const authRoutes = require('./src/modules/auth/routes')
const movieRoute = require('./src/modules/movie/routes')
const adminRoute = require('./src/modules/admin/routes')
const userRoute = require('./src/modules/user/routes')
const theaterRoute = require('./src/modules/Theater/routes')

// Use routes
app.use('/auth', authRoutes);
app.use('/movie', movieRoute)
app.use('/admin', adminRoute)
app.use('/user', userRoute)
app.use('/theater', theaterRoute)



const server = app.listen(process.env.PORT || 8888, () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
});
