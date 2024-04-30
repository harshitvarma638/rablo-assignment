const { configDotenv } = require('dotenv');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Product = require('./models/schema');

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

//read the data
app.get("/",async(req, res) => {
    try{
        const data = await Product.find();
        res.json({success: true, data: data});
    }
    catch(err) {
        res.json({success: false, message: err});
    }
});

//create the product data or add a product
app.post("/create", async(req, res) => {
    try{
        const product = new Product(req.body);
        await product.save();
        res.send({success: true, message: "Product created successfully"});
    }
    catch(err) {
        res.json({success: false, message: err});
    }
});

//Update the product details
app.put("/update", async(req, res) => {
    try{
        const { _id, ...rest} = req.body;
        await Product.updateOne({_id : _id},rest);
        res.send({success: true, message: "Product updated successfully"});
    }
    catch(err) {
        res.json({success: false, message: err});
    }
});

//Delete the product
app.delete("/delete/:id", async(req, res) => {
    try{
        const id = req.params.id;
        await Product.deleteOne({_id: id});
        res.send({success: true, message: "Product deleted successfully"});
    }
    catch(err) {
        res.json({success: false, message: err});
    }
});

//get the featured products
app.get("/featured/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const data = await Product.find({featured: id});
        res.json({success: true, data: data});
    }
    catch(err) {
        res.json({success: false, message: err});
    }
});

//get products with price below a certain value
app.get("/price/:price", async(req, res) => {
    try{
        const price = req.params.price;
        const data = await Product.find({price: {$lte: price}});
        res.json({success: true, data: data});
    }
    catch(err) {
        res.json({success: false, message: err});
    }
});

//get products with ratings above a certain value
app.get("/rating/:rating", async(req, res) => {
    try{
        const rating = req.params.rating;
        const data = await Product.find({rating: {$gte: rating}});
        res.json({success: true, data: data});
    }
    catch(err) {
        res.json({success: false, message: err});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});