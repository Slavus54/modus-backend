const {Schema, model} = require('mongoose') 

const Profiles = new Schema({
    account_id: String,
    username: String,
    security_code: String,
    telegram_tag: String,
    sex: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    field: String,
    attainments: [{
        shortid: String,
        title: String,
        category: String,
        format: String,
        level: String,
        photo_url: String,
        likes: Number
    }],
    exercises: [{
        shortid: String,
        text: String,
        category: String,
        weekday: String,
        repetitions: Number,
        photo_url: String,
        rating: Number
    }],
    account_components: [{
        shortid: String,
        title: String,
        path: String
    }]
})

module.exports = model('Profiles', Profiles)