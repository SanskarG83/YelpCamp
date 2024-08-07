const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    location: String,
    img: String,
    description: String,
    price:  Number
});

module.exports = mongoose.model('Campground', CampgroundSchema);
