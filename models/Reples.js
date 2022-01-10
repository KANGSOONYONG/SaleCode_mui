const mongoose = require('mongoose');


const replesSchema = mongoose.Schema({
    reple: {
        type: String
    },
    number : {
        type: Number
    }
})

const Reples = mongoose.model('Reple', replesSchema)

module.exports = { Reples };