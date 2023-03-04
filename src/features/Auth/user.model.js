const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = User = mongoose.model('user', userSchema);