let mongoose = require('mongoose'),
	Users 	 = require('../models/Users.js'),
	assert   = require('assert'),
	fs 		 = require('fs');

const User = mongoose.model('Users');

//----------------------------------------------------------------------------------------
// Option config

let fileContents = fs.readFileSync('config.json','utf8');
let cfg = JSON.parse(fileContents);

//----------------------------------------------------------------------------------------
// Searching user

module.exports.search = (login, password) => {
	return Users.findOne( { login: login, password: password } );
}

//----------------------------------------------------------------------------------------
// Sign up new user

module.exports.create = (data) => {
	let user = new User({
		login: data.login,
		password: data.password,
		name: data.name,
		surname: data.surname,
		createdAt: new Date(),
		maxSize: cfg['MAX_CLOUD_SIZE'],
		size: 0,
		status: 'false'
	});
	let promise = user.save();
    return promise;

}

//----------------------------------------------------------------------------------------
// Update User status

module.exports.update = (object) => {
	Users.update( object,  { $set: { status: "true"} }, (err, result) => {
		if ( err ) console.log(err);
		else {
			return true;
		}
	});
}

module.exports.get = (id) => {
	return Users.findOne({_id: id})
}