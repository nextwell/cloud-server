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
// Searching file

module.exports.search = (object) => {
	//let oID = ObjectID(id);;
	return File.find( object );
}

//----------------------------------------------------------------------------------------
// Remove file from account

module.exports.remove = (object) => {
	return File.findOneAndRemove( object );
}

//----------------------------------------------------------------------------------------
// Update file status

module.exports.update = (object) => {
	File.update( object,  { $set: { status: "open"} }, (err, result) => {
		if ( err ) console.log(err);
		else {
			return true;
		}
	});
}