let mongoose = require('mongoose'),
	user 	 = require('./UsersUtils.js'),
	file	 = require('./FilesUtils.js');


module.exports.setUpConnection = () => {
	mongoose.connect(`mongodb://localhost/cloud`);
}

module.exports.Users = user;
