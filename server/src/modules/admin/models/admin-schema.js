const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model


const adminSchema = new Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true // Ensure email is unique
    },

})

const Admin = model('admins', adminSchema)

module.exports = Admin