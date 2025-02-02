const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const mongoose = require('mongoose');

// ------------------- Creating Order Function --------------------- 
const createOrder = async (req, res) => {
    try {
        // accessing current user
        let user = req.user.id;
        // getting data from from frontend using cors package
        const {
            productId,
            quantity,
            totalPrice,
        } = req.body;

        // Checking if user exits in database or not
        let currentUser = await User.findOne({ _id: user });
        if (!currentUser) {
            return res.send({msg: "User not found, first register then login please"});
        }

        // Checking whether product exists in database or not
        let checkProduct = await Product.findById(productId);
        if (!checkProduct) {
            return res.send({msg: "Product is not available in database"});
        }

        // Preparing final order data to be inserted to database
        const newOrderData = {
            user,
            products: {
                productId,
            },
            quantity,
            totalPrice,
        }

        let newOrder = await Order.create(newOrderData);

        // Add the order to the user's order history
        currentUser.orders.push(newOrder._id);
        await currentUser.save();

        // const userCount = await User.findById(user);
        // let orderCount = userCount.orders.length;

        res.status(200).send({msg: "Order created successfully", newOrder});

    } catch (error) {
        console.log(error);
        res.status(500).send({msg: "Internal Server Error"});
    }
};

/* ----------------------- Getting User Order -------------------------- */
const getUserOrder = async (req, res) => {
    try {
        let user = req.user.id;
        console.log(user);
       
        const userOrder = await User.findById(user).populate({path: "orders", populate: {path: "products.productId", model: "Product"}});
        if (!userOrder) {
            return res.send({msg: "User is not found"});
        }
        res.status(200).send(userOrder);
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = { createOrder, getUserOrder };