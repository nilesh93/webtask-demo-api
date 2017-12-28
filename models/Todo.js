const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    owner: String,
    description: String,
    created_at: Date,
    id: mongoose.Schema.ObjectId
})