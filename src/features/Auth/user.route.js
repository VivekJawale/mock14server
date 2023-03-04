const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express.Router();
const User = require("./user.model");
const SECRET_KEY = process.env.SECRET_KEY;


app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.send({
                status: 0,
                message: "user already exist",
            });
        } else {
            let pass = await bcrypt.hash(password, 10);
            let user = await User.create({
                ...req.body,
                password: pass,
            });
            return res
                .status(201)
                .send({ user, message: "User created Successfully" });
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            let pass = await bcrypt.compare(password, user.password);
            if (!pass) {
                return res.send("incorrect password");
            } else {
                let token = jwt.sign(
                    {
                        _id: user._id,
                        email: user.email,
                    },
                    SECRET_KEY
                );
                return res.send({ token, message: "Login Successfully" });
            }
        } else {
            return res.status(404).send("You have to signup first");
        }
    } catch (error) {
        return res.send(error.message);
    }
});

module.exports = app;