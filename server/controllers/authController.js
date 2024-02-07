const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('Test is working');
}

// Register endpoint
const registerUser = async (req, res) => {
    try {
        // Check if name is valid
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({ error: 'Name is required' });
        }
        // Check if password is valid
        if (!password || password.length < 6) {
            return res.json({ error: 'Password is required and should be min 6 characters long' });
        }
        // Check if email is valid
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: 'Email is taken' });
        }
        // Hash password
        const hashedPassword = await hashPassword(password);
        // Create user in the database
        const user = await User.create({ name, email, password: hashedPassword });

        return res.json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'No user found' });
        }
        // Check if password is correct
        const valid = await comparePassword(password, user.password);
        if (valid) {
            // Generate token with expiration time (e.g., 1 hour)
            const tokenExpirySeconds = 3600;
            jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: tokenExpirySeconds },
                (err, token) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    // Set the cookie and send the response
                    res.cookie('token', token, { maxAge: tokenExpirySeconds * 1000, httpOnly: true }).json(user);
                }
            );
        } else {
            // Invalid password
            return res.json({ error: 'Invalid password' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ error: 'Unauthorized' });
            }
            res.json(user);
        });
    } else {
        res.json(null);
    }
}

// Logout endpoint with token expiration
const logoutUser = (req, res) => {
    // Clear the token cookie and set it to expire immediately
    res.clearCookie('token', { expires: new Date(0) }).json({ message: 'Logged out successfully' });
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
};
