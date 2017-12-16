//----------------------------------------------------------------------------------------
// Login / Sign-in Page

let md5 	= require('md5'),
	Logger  = require('../modules/logger.js');

module.exports = (app, db) => {
	app.get('/login', (req, res) => {
		if ( req.session.userData ){
			res.redirect('/home');
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
				if ( data.status == 'true'){
					req.session.userData = data;
					Logger.write({source: "Express routes", action: "INFO", text: `Authorization success | id: ${data._id}`})
					res.redirect('/home');
				}
				else res.send("Сначала подтвердите электронный адрес!")
			})
			.catch(err => res.send("Ошибка, повторите попытку!"));

	})
}