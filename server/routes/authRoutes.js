const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');


//middleware
router.use(cors(
    {
        origin: 'http://tasty-terra-pizza.vercel.app',
        credentials: true,
        optionsSuccessStatus: 200
    }
));

router.get("/", test)
router.post("/register", registerUser)
router.post("/login", loginUser )
router.post('/logout', logoutUser);
router.get('/profile', getProfile);



module.exports = router;