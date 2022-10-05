const mongoose = require('mongoose')

const {Schema} = mongoose;

const Exercise = new Schema({
   user_id: Schema.Types.ObjectId,
   description:String,
   duration: Number,
   date : String
})

module.exports = mongoose.model('exerciseSchema',Exercise,'exercise')