//----------------------------------------------------------------------------------------
// Sign Up Page

let md5     = require('md5'),
	Logger  = require('../modules/logger.js');

module.exports = (app, db) => {
	app.get('/signup', (req, res) => {
		if ( req.session.userData ){
			res.redirect('/login');
		} else{
			res.render('sign-up', { title: 'sign-up page'});
		}
	})
	app.post('/signup', (req, res) => {
		let data = {
			login: req.body.login,
			password: md5(req.body.password),
			name: req.body.name,
			surname: req.body.surname
		};
		db.Users.create(data)
			.then(data => { 
				Logger.write({source: "Express routes", action: "INFO", text: `Registration success | id: ${data._id}`})
				res.redirect('/login'); 
			})
			.catch( err => res.send("ERROR!"));
	})
}