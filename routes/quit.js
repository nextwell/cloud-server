//----------------------------------------------------------------------------------------
// Quit page / Destroy session

module.exports = (app, db) => {
	app.get('/quit', (req, res) => {
		if ( req.session.userData ){
			req.session.userData = null;
			res.redirect('/');
		} else{
			res.redirect('/');
		}
	})
}