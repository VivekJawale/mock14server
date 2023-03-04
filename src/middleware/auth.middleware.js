const jwt = require("jsonwebtoken");
const express = require("express");
const SECRET_KEY = process.env.SECRET_KEY;
const User = require("../features/Auth/user.model")


const authMiddleWare = async (req, res, next) => {
    const { token } = req.headers;
    try {
        if (!token) {
            return res.send("Token missing");
        } else {
            let verify = jwt.verify(token, SECRET_KEY);
            if (!verify) {
                return res.send("Invalid token");
            } else {
                let user = await User.findOne({ _id: verify._id });
                if (!user) {
                    return res.send("user not found");
                } else {
                    req._id = user._id;
                    next();
                }
            }
        }
    } catch (error) {
        return res.send(error);
    }
};

module.exports = { authMiddleWare };