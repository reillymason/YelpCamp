const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '653662ec38128cd8cb252b30',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia exercitationem eius, cupiditate sit ut voluptas odio dignissimos. Maiores quisquam possimus ad, atque expedita cumque vitae adipisci, maxime a natus quas!",
            price,
            geometry: {
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/ddfdjt33k/image/upload/v1698406883/YelpCamp/ab4aojmqvs3p3gtc1akn.png',
                  filename: 'YelpCamp/ab4aojmqvs3p3gtc1akn'
                },
                {
                  url: 'https://res.cloudinary.com/ddfdjt33k/image/upload/v1698406883/YelpCamp/i3gdjxx4uj5kqcm8aeb8.jpg',
                  filename: 'YelpCamp/i3gdjxx4uj5kqcm8aeb8'
                }
            ],
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});