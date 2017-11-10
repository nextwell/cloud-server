let mongoose = require('mongoose'),
	Users 	 = require('../models/Files.js'),
	assert   = require('assert');


const File = mongoose.model('Files');


//----------------------------------------------------------------------------------------
// Add a new file

module.exports.create = (data) => {
	let file = new File({
		userID: data.userID,
		name: data.name,
		status: "hidden",
		fileURL: data.fileURL,
		size: data.size,
		createdAt: new Date()
	});
	let promise = file.save();
    assert.ok(promise instanceof require('mpromise'));
    return promise;

}

//----------------------------------------------------------------------------------------
// Searching user

module.exports.search = (id) => {
	var oID = mongoose.Types.ObjectId(id);
	return File.find( { _id: oID } );
}