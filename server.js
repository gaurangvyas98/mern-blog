// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const routes = require('./routes/api');
const userRouter = require("./routes/user")

const dirname = path.resolve()

// Step 2
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// Data parsing
app.use(express.json()); //parse JSON object
app.use(express.urlencoded({ extended: false }));

// Step 3

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// HTTP request logger
app.use(morgan('tiny'));
app.use('/api/blogs', routes);
app.use('/api/user',userRouter);

//error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});

//in create-react-app build folder is created while in vite dist folder is created
app.use(express.static(path.join(dirname, '/client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, 'client', 'dist', 'index.html'))
})

// gggvvvgggvvv1998


app.listen(PORT, console.log(`Server is starting at ${PORT}`));