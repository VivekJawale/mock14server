const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: String,
        status: String,
        user: {
            ref: "user",
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }
);

module.exports = Task = mongoose.model("task", taskSchema)