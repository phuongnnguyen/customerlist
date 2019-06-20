const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema({
    name: String,
    phoneNo: String,
    requirement: String,
    address: String,
    source: String,
    day: String,
    potential: String,
    notes: String
}, { versionKey: false });

module.exports = mongoose.model("Customers", CustomerSchema);