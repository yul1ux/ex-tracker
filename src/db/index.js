const mongoose  = require('mongoose')

const connect = async() =>{
    const db = await mongoose.connect('mongodb+srv://yuliux:mrtrojan12@cluster0.evxqbwy.mongodb.net/?retryWrites=true&w=majority')

    return db;
}

module.exports = connect