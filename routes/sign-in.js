//----------------------------------------------------------------------------------------
// Login / Sign-in Page

let md5 	= require('md5'),
	Logger  = require('../modules/logger.js');

module.exports = (app, db) => {
	app.get('/login', (req, res) => {
		if ( req.session.userData ){
			res.redirect('/home');
		} else{
			if ( req.query.err ){
				let error;
				switch (req.query.err){
					case 'email': error = 'Подтвердите почту!'; break;;
					case 'unknown': error = 'Неверный логин/пароль!'; break;;
				}
				if ( error ){
					res.render('sign-in', { title: 'login page', error: error});
				} else res.redirect('/login');
			} else res.render('sign-in', { title: 'login page'});
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
				else res.redirect("/login?err=email")
			})
			.catch(err => res.redirect("/login?err=unknown"));

	})
}