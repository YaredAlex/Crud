const mongoose = require("mongoose");
require("dotenv/config");

const userSchema = new mongoose.Schema({
	id: { type: Number, index: { unique: true } },
	f_name: { type: String, required: true },
	l_name: { type: String },
	email: { type: String, required: true, index: { unique: true }, lowercase: true, trim: true },
	gender: { type: String },
});

module.exports = mongoose.model("Holder", userSchema);
