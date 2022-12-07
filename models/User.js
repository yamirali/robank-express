const {Schema, model} = require('mongoose')

const schema = new Schema({
    login: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    robucks: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    order: {
        type: Array,
        require: true
    }
})

module.exports = model('User', schema)