//----------------------------------------------------------------------------------------
// Home page ( in-action page / React )

module.exports = (app, db) => {
	app.get('/home', (req, res) => {
		if ( req.session.userData ){
			let data = req.session.userData;
			res.render('home', { title: 'Главная страница', name: data.name});
		} else{
			res.redirect('/login');
		}
	})
}