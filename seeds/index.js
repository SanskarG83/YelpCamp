const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const {places, descriptors, descriptions} = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error..."));
db.once("open", () => {
    console.log("Databse connected...");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const tempprice = Math.floor((Math.random() * 40) + 10);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            img: 'https://picsum.photos/400?random=${Math.random()}',
            price: tempprice,
            description: `${sample(descriptions)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})