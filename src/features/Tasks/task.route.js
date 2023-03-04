const express = require("express");
const Task = require("./task.model");
const app = express();


app.get("", async (req, res) => {
    try {
        let task = await Task.find({ user: req._id }).populate(["user"]);
        return res.status(200).send(task);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})


app.post("", async (req, res) => {
    const { status, title } = req.body;
    try {
        let tasks = await Task.find({ user: req._id, status: status });
        if (tasks.length === 5) {
            return res.send("Can't report more then 5 bug");
        } else {
            let temp = await Task.create({
                ...req.body,
                user: req._id,
            });
            return res.status(200).send(temp);
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});


app.delete("/:id", async (req, res) => {
    try {
        let task = await Task.findByIdAndDelete({ _id: req.params.id });
        if (task) {
            return res.status(200).send({ status: 0, message: "Deleted Successfully" });
        } else {
            return res.status(404).send({ status: 0, message: "Task does not exists" })
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

module.exports = app;