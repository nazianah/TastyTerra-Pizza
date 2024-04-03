const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');
const Product = require('../models/product');

//middleware
router.use(cors(
    {
        origin: 'https://tasty-terra-pizza-vert.vercel.app/',
        credentials: true
    }
));

router.get("/", test)
router.post("/register", registerUser)
router.post("/login", loginUser )
router.post('/logout', logoutUser);
router.get('/profile', getProfile);

// GET /products endpoint to fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    const productArray = products.map(product => ({
      id: product._id.toString(), // Convert _id to string
      title: product.title,
      price: product.price,
      image01: product.image01,
      image02: product.image02,
      image03: product.image03,
      category: product.category,
      desc: product.desc
    }));
    res.json(productArray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






module.exports = router;