let md5 = require('md5');

module.exports = (app, db) => {
	app.get('/login', (req, res) => {
		if ( req.session.userData ){
			let data = req.session.userData;
			res.send(`Hello ${data.name}`);
		} else{
			res.render('sign-in', { title: 'login page'});
		}
		
	})
	app.post('/login', (req, res) => {
		let data = {
			login: req.body.login,
			password: md5(req.body.password)
		};
		db.Users.search(data.login, data.password)
			.then(data => {
				req.session.userData = data;
				res.send(req.session.userData._id);
			})
			.catch(err => res.send("ERROR!"));

	})
}