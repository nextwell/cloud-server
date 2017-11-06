let md5     = require('md5');

module.exports = (app, db) => {
	app.get('/signup', (req, res) => {
		 res.render('sign-up', { title: 'sign-up page'});
	})
	app.post('/signup', (req, res) => {
		let data = {
			login: req.body.login,
			password: md5(req.body.password),
			name: req.body.name,
			surname: req.body.surname
		};
		db.Users.create(data)
			.then(data => res.send(data))
			.catch( err => res.send("ERROR!"));
	})
}