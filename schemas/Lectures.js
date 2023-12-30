const {Schema, model} = require('mongoose') 

const Lectures = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    level: String,
    directions: [String],
    resources: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        url: String 
    }], 
    manuscripts: [{
        shortid: String,
        name: String,
        headline: String,
        tool: String,
        size: Number,
        photo_url: String,
        likes: Number
    }]
})

module.exports = model('Lectures', Lectures)