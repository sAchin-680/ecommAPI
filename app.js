const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Mongoose connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: 'eshop-database',
  })
  .then(() => {
    console.log('Database connection is ready');
  })
  .catch((err) => {
    console.log(err);
  });

// Schema and model
const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: Number,
});
const Product = mongoose.model('Product', productSchema);

// Environment variables
const api = process.env.API_URL;
const PORT = 3000;

// Routes
app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'hair dryer',
    image: 'some_url',
  };
  res.send(product);
});

app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(api);
  console.log(`Server is running on port ${PORT}`);
});
