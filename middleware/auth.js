const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async(req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
       try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');
        next();

       } catch (error) {
        res.status(401).json({message: 'Not Authorised, token failed', error: error.message})
       } 
    }

    if (!token) {
        res.status(401).json({message: 'Not Authorised, No token available'})
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
      res.status(403).json({message: 'Not Authorised as Admin'});  
    }
};

const stockManager = (req, res, next) => {
    if (req.user && req.user.role === 'stockManager') {
        next()
    } else {
      res.status(403).json({message: 'Not Authorised as Stock Manager'});  
    }
};

module.exports = { protect, admin, stockManager}