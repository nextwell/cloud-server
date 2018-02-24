//----------------------------------------------------------------------------------------
// Main page APP

module.exports = (app, db) => {
	app.get('/main', (req, res) => {
		let user = req.session.userData;
		if ( user ){
			res.render('main');
		} else{
			res.redirect('/login');
		}
	})
}