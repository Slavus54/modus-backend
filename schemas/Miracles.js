const {Schema, model} = require('mongoose') 

const Miracles = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    century: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    rating: Number,
    questions: [{
        shortid: String,
        name: String,
        text: String,
        level: String,
        answer: String
    }],
    buildings: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        cords: {
            lat: Number,
            long: Number
        },
        photo_url: String,
        likes: Number
    }]
})

module.exports = model('Miracles', Miracles)