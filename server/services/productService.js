const Product = require('../models/product');

async function insertProducts(products) {
  try {
    await Product.insertMany(products);
    console.log('Products inserted successfully');
  } catch (error) {
    console.error('Error inserting products:', error);
  }
}

module.exports = { insertProducts };
