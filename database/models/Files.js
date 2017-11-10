let mongoose = require('mongoose');

const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

const FileSchema = new Schema({
	userID: { type: ObjectId },
	name: { type: String },
	status: { type: String },
	fileURL: { type: String },
	size: { type: Number },
	createdAt: { type: Date }
});

const File = mongoose.model("Files", FileSchema);

module.exports = File;