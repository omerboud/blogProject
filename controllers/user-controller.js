const express = require('express');
const router = express.Router();
const User = require('../models/userDB');
const bcrypt = require('bcryptjs');
const { model } = require('mongoose');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ username, email, password: await bcrypt.hash(password, 10) });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        req.session.userId = user._id;
        res.status(200).json({ message: 'Login successful' , user: user.username });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getUserById = async (req, res) => {
    if(!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const user = await User.findById(req.session.userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({username : user.username});
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const logOut = async (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ username: req.params.username }); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


module.exports = { register, login, getAllUsers , getUserById, logOut , deleteUser };
