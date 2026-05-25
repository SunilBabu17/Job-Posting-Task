const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/authRoutes')


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth',authRouter)



mongoose.connect('mongodb://localhost:27017/JobManagement')
        .then(() => console.log('mongodb connected'))
        .catch((err) => console.log(err))

app.listen(5000,() => console.log('Server is running'))