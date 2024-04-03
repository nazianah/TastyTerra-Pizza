const Product = require('../models/product');

async function insertProducts(products) {
  try {
    await Product.insertMany(products);
    console.log('Products inserted successfully');
  } catch (error) {
    console.error('Error inserting products:', error);
  }
}

async function createProduct(productData) {
  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    console.log('Product created successfully:', newProduct);
    return newProduct;
  } catch (error) {
    throw new Error("Error creating product:", error);
  }
}

async function createProducts(productsData) {
  try {
    const newProducts = await Product.insertMany(productsData);
    console.log('Products created successfully:', newProducts);
    return newProducts;
  } catch (error) {
    throw new Error("Error creating products:", error);
  }
}

module.exports = {
  insertProducts,
  createProduct,
  createProducts
};
