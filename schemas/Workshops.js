const {Schema, model} = require('mongoose') 

const Workshops = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    tasks: [{
        id: String,
        headline: String,
        level: String,
        progress: Number
    }],
    dateUp: String,
    time: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    telegram_tag: String,
    members: [{
        account_id: String,
        username: String,
        role: String,
        task: String
    }],
    images: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        photo_url: String,
        likes: Number
    }]
})

module.exports = model('Workshops', Workshops)