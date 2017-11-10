//----------------------------------------------------------------------------------------
// Home page ( in-action page / React )

module.exports = (app, db) => {
	app.get('/home', (req, res) => {
		if ( req.session.userData ){
			let session = req.session.userData;
			let files;
			db.File.search({userID: session._id })
				.then(data => {
					res.render('home', { title: 'Главная страница', name: session.name, files: data});
				})
				.catch(err => {
					console.log(err);
				})
		
		} else{
			res.redirect('/login');
		}
	})
}