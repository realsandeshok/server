const User = require('../models/User')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

// Register User
const registerUser = async (req, res) => {
    const {username, password, role} = req.body;

    if (!['admin', 'user', 'stockManager'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

    const userExists = await User.findOne({username})

    if (userExists) {
        return res.status(400).json({message: 'User Already Exists'})
    }

    const user = await User.create({username, password, role})
    
    if (user) {
        res.status(201).json({
            _id : user._id,
            username : user.username,
            password : user.password,
            role : user.role,
            token : generateToken(user._id)
        })

    } else {
        res.status(400).json({message: 'Invalid User Data'})
    }

}

// Authenticate User 
const authUser = async (req, res) => {
    const { username, password} = req.body;

    const user = await User.findOne({username})

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id : user._id,
            username : user.username,
            password : user.password,
            role : user.role,
            token : generateToken(user._id)
        })
    } else {
        res.status(401).json({message: 'Invalid Username or Password'})
    }
}

// Get Users
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users)
}

// Delete User
const deleteUser = async (req,res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.deleteOne()
        res.json({message : 'User Removed'})
    } else {
        res.status(404).json({message : 'User not Found'})
    }
}

module.exports = {registerUser, authUser, getUsers, deleteUser}