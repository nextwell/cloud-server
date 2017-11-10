//----------------------------------------------------------------------------------------
// Home page ( in-action page / React )

module.exports = (app, db) => {
	app.get('/home', (req, res) => {
		if ( req.session.userData ){
			let session = req.session.userData;
			let files;
			console.log(session._id);
			/*db.File.search({userID: session._id })
				.then(data => {
					console.log(data);
				})
				.catch(err => {
					console.log(err);
				})*/
			//console.log(files);
			res.render('home', { title: 'Главная страница', name: session.name});
			
		} else{
			res.redirect('/login');
		}
	})
}