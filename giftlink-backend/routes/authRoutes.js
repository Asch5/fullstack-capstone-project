const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino'); // Import Pino logger
const logger = pino(); // Create a Pino logger instance
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase();
        // Task 2: Access MongoDB collection
        const collection = db.collection('users');
        // Task 3: Check for existing email
        const existingEmail = await collection.findOne({
            email: req.body.email,
        });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const email = req.body.email;
        // Task 4: Save user details in database
        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });
        console.log('newUser', newUser);
        const payload = {
            user: {
                id: newUser.insertedId,
            },
        };
        // Task 5: Create JWT authentication with user._id as payload
        const authtoken = jwt.sign(payload, JWT_SECRET);
        logger.info('User registered successfully');
        res.json({ authtoken, email });
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
});

router.post('/login', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase();

        // Task 2: Access MongoDB users collection
        const collection = db.collection('users');

        // Task 3: Check for user credentials in database
        const user = await collection.findOne({ email: req.body.email });

        console.log('user from loginBackend', user);

        if (!user) {
            return res
                .status(400)
                .json({ error: 'Invalid credentials or user not found' });
        }

        // Task 4: Check if the user entered password matches the stored encrypted password
        const isMatch = await bcryptjs.compare(
            req.body.password,
            user.password
        );

        if (!isMatch) {
            return res
                .status(400)
                .json({ error: 'Invalid credentials or user not found' });
        }

        // Task 5: Fetch user details from database
        const { _id, firstName, lastName, email } = user;

        // Task 6: Create JWT authentication with user._id as payload
        const payload = {
            user: {
                id: _id,
            },
        };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info('User logged in successfully');
        res.json({ authtoken, firstName, lastName, email });
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;
