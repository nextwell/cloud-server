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
// Just for test

module.exports.list = () => {
	return Users.find();
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
		size: 0
	});
	let promise = user.save();
    assert.ok(promise instanceof require('mpromise'));
    return promise;

}