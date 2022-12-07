const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    url: {
        type: String,
        require: true
    }
})

module.exports = model('Good', schema)