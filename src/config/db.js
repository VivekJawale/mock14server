const mongoose = require("mongoose")
require('dotenv').config()
module.exports = connect = async () => {
    return mongoose.connect(process.env.URL)
}