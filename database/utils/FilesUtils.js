let mongoose = require('mongoose'),
	Users 	 = require('../models/Files.js'),
	assert   = require('assert');


const File = mongoose.model('Files');


//----------------------------------------------------------------------------------------
// Add a new file

module.exports.create = (data) => {
	let file = new User({
		userID: data.userID,
		name: data.name,
		fileURL: "test/123.txt",
		status: "hidden",
		size: data.size,
		createdAt: new Date()
	});
	let promise = file.save();
    assert.ok(promise instanceof require('mpromise'));
    return promise;

}