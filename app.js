const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const Product = require('./models/product');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mudb2')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
// Home Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Save Data Route
app.get('/saveData', (req, res) => {

    const userdata = {
        pname: "iPhone 14",
        pprice: 100000,
        pdescription: "This is the latest iPhone model with advanced features and improved performance."
    };

    const mydata = new Product(userdata);

    mydata.save()
        .then(() => {
            res.send("Data saved successfully");
        })
        .catch(err => {
            res.send("Error: " + err);
        });
});

// Get All Data Route
app.get('/getdata', (req, res) => {

    Product.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send("Error: " + err);
        });

});

app.post('/addData', (req, res) => {
    Product.create(req.body)
        .then(() => {
            res.json({ flag: 1, msg: "record added" });
        })
      });

// About Route
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

// Contact Route
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});