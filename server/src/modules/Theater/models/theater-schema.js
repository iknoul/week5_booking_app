const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model


const theaterSchema = new Schema({
    name: {
		type:String,
		required: true
    },
    location: {
		type:String, 
		required: true
    },
    movie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    seatPrice: {
		type:Number,
		required: true
    },
    
})

const Theater = model('theaters', theaterSchema)

module.exports = Theater