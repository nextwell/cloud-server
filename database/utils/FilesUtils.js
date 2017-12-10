let mongoose = require('mongoose'),
	Users 	 = require('../models/Files.js'),
	assert   = require('assert'),
	ObjectID = require('mongodb').ObjectID;


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
 	return promise;

}

//----------------------------------------------------------------------------------------
// Searching user

module.exports.search = (object) => {
	//let oID = ObjectID(id);;
	return File.find( object );
}

//----------------------------------------------------------------------------------------
// Just for test

module.exports.list = () => {
	return File.find();
}