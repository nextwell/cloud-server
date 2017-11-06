let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
	userID: { type: String },
	name: { type: String },
	fileURL: { type: String },
	status: { type: String },
	size: { type: Number },
	createdAt: { type: Date }
});

const File = mongoose.model("Files", FileSchema);

module.exports = File;