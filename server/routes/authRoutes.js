const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');


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



module.exports = router;