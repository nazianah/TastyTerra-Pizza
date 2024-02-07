const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err, 'MongoDB Connection Error'));

//middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://tasty-terra-pizza.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use("/", require("./routes/authRoutes"));

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    });

