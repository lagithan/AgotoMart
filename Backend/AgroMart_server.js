import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './Routes/Routes.js';
import product from './Routes/Productroute.js';
import employee from './Routes/Employeeroute.js'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import payment from './Routes/Paymentroute.js';

dotenv.config();

const app = express();

// Database connection
async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('AgroMart connected to database');
    } catch (error) {
        console.error('Failed to connect to AgroMart database:', error);
    }
}

connectDatabase();

// Middleware
app.use(cors({
    origin: '*', // Adjust this for better security in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/user', router);
app.use('/product', product);
app.use('/employee',employee);
app.use('/payment',payment);



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
