//----------------------------------------------------------------------------------------
// Index Page

module.exports = (app) => {
	app.get('/', (req, res) => {
		if ( req.session.userData ){
			res.redirect('/home');
		} else{
			res.redirect('/login');
		}
	})
}