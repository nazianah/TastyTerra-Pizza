const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  image01: String,
  image02: String,
  image03: String,
  category: String,
  desc: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
