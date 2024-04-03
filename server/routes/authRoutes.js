const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser, createProduct } = require('../controllers/authController');
const productService = require('../services/productService');
const product = require('../models/product')


//middleware
const origin = process.env.VERCEL_URL || 'https://tasty-terra-pizza-vert.vercel.app/';
router.use(cors({
  origin,
  credentials: true
}));

router.get("/", test)
router.post("/register", registerUser)
router.post("/login", loginUser )
router.post('/logout', logoutUser);
router.get('/profile', getProfile);

router.post("/products", createProduct);
router.get('/products', async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;