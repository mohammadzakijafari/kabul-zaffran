const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register function which gets username, email and password from user checks whether the users exist or not and make register to database
const register = async (req, res) => {
    try {
        // getting username, email and password from user
        let {
            username, 
            email, 
            password
        } = req.body;
        
        // checks that all required fields are provided 
        if(!username && !email && !password) {
            return res.send({ msg: "All fields username, email and password are required" });
        }
        // checks if the user exists in our database or not
        let oldUser = await User.findOne({ email });
        if(oldUser) {
            return res.send({ msg: "User already exits, please register with a new email" })
        }
        
        // before storing password to database incrypts the password
        let hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));
        // creates new user to mongodb database
        let newUser = await User.create({ username, email, password: hashedPassword });
        return res.status(200).send({ msg: "User Registered Successfully, please login", newUser});
    } catch (error) {
        console.log(error);
    }
}

// login functionality
const login = async (req, res) => {
    try {
        let { 
            email, 
            password 
        } = req.body;

        // checks that all required fields are provided 
        if (!email && !password) {
            return res.send({msg: "Both email and password are required"});
        }
        
        // checks if the user exists in our database or not
        let oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.send({msg: "User is not found, please register first"});
        }

        // checks the password whether it is correct or not using bcrypt library
        let isValidPassword = bcrypt.compare(password, oldUser.password);
        if (!isValidPassword) {
            return res.send({msg: "Password is wrong"});
        }

        // Generating payload and token
        let payload = {
            id: oldUser._id,
            username: oldUser.username
        }
        // Sign in and generating secret key
        let token = await jwt.sign(payload, process.env.SECRET_KEY);
        // console.log(token);
        return res.status(200).send({msg: "Login successful, welcome", token});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
}

// addmin login functionality
const adminLogin = async(req, res) => {
    try {
        const {email, password} = req.body;
        if (!email && !password) {
            return res.send({msg: "Both email and password are required"});
        }
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = await jwt.sign(email+password, process.env.SECRET_KEY);
            return res.status(200).send({msg: "Login successful, welcome", token});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
}

module.exports = { register, login, adminLogin };