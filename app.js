const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const campground = require('./models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error..."));
db.once("open", () => {
    console.log("Database connected...");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
});

// app.get('/makeCampGround', async (req, res) => {
//     const camp = new Campground({
//         title: 'AdventureLand',
//         location: 'Pune',
//         description: 'Place to camp and adventure',
//         price: '2000'
//     });
//     await camp.save();
//     res.send(camp);
// }) 

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})

app.post('/campgrounds', async (req, res) => {
    const {title, location, description, price} = req.body;
    const newCampground = new Campground({title, location, description, price});
    await newCampground.save();
    res.redirect('/campgrounds');
})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground, query: req.query});
})

// app.post('campgrounds/:id', async (req, res) => {
//     const {title, location, description, price} = req.body;
//     const campground = Campground.findById(req.params.id);
//     campground.title = title;
//     campground.location = location;
//     campground.description = description;
//     campground.price = price;
//     await campground.save();
//     res.redirect('campgrounds/show');  
// })

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const { title, location, description, price } = req.body;
    const updatedCampground = await Campground.findByIdAndUpdate(id, { title, location, description, price }, { new: true });
    res.redirect(`/campgrounds/${updatedCampground.id}?update=success`);
});

// app.delete('/campgrounds/:id', async (req, res) => {
//     const {id} = req.params;
//     await Campground.findByIdAndDelete(id);
//     res.redirect('/campgrounds');
// });
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Campground.findByIdAndDelete(id);
        res.sendStatus(200);
    } 
    catch (err) {
        console.error('Error deleting campground:', err);
        res.sendStatus(500);
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000....");
    // render("listening on 3000...")
})