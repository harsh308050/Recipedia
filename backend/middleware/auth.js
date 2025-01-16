const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).send({ error: 'Authorization header missing or malformed.' });
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id }).populate('savedRecipes').lean(); // Populate savedRecipes

        if (!user) {
            return res.status(401).send({ error: 'User not found. Authentication failed.' });
        }

        req.token = token.replace('Bearer ', '');
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ error: 'Token has expired. Please log in again.' });
        }
        res.status(401).send({
            error: process.env.NODE_ENV === 'production' ? 'Please authenticate.' : error.message,
        });
    }
};

module.exports = auth;
