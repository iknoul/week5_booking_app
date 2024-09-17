const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model


const movieSchema = new Schema({
    Title: {
      type: String,
      required : true
    },
    Runtime:{
      type:String,
      required : true
    },
    Poster:{
      type: String,
      required : true

    },
    Actors:{
      type: String,
      required : true

    },
    Genre:{
      type:[String], 
      required : true

    },
    Language:{
      type:String,
      required : true

    },
    imdbRating:{
      type: Number,
      

    },
    Plot: {
      type:String, 
      required : true

    },
    Theater: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Theater' }],


    

})

const Movie = model('movies', movieSchema)

module.exports = Movie