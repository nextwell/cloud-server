module.exports = (app, db) => {
	app.get('/settings', (req, res) => {
		if ( req.session.userData ){
			res.redirect('/home');
		} else res.redirect('/login');
	})
	app.post('/settings', (req, res) => {
		if ( req.session.userData ){

		} else res.redirect('/login');
	})
}