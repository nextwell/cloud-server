let mongoose = require('mongoose'),
	user 	 = require('./UsersUtils.js'),
	file	 = require('./FilesUtils.js');

mongoose.Promise = global.Promise;

module.exports.setUpConnection = () => {
	mongoose.connect(`mongodb://localhost/cloud`, { useMongoClient: true });
}

module.exports.Users = user;
module.exports.File = file;
