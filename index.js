require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./src/config/db");
const PORT = process.env.PORT || 8080;
const AuthRouter = require('./src/features/Auth/user.route')
// const { authMiddleWare } = require('./src/middleware/auth.middleware')
const TasksRouter = require('./src/features/Tasks/task.route')
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", AuthRouter)

app.get("", async (req, res) => {
    res.send("Hello World")
})

// app.use(authMiddleWare);

app.use("/task", TasksRouter)



app.listen(PORT, async (req, res) => {
    try {
        await connect();
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error: ", error);
    }
})