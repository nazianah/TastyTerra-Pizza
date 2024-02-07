const express = require('express');
const session = require('express-session');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');

// Middleware
router.use(cors({
    origin: 'https://tasty-terra-pizza.vercel.app',
    credentials: true
}));

router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 } // Adjust the maxAge as needed
}));

// Routes
router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/logout', logoutUser);
router.get('/profile', getProfile);

module.exports = router;
