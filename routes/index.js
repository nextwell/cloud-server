//----------------------------------------------------------------------------------------
// Index Page

module.exports = (app) => {
	app.get('/', (req, res) => {
		if ( req.session.userData ){
			res.redirect('/home');
		} else{
			res.render('index', { title: 'Главная страница', message: 'Добро пожаловать'});
		}
	})
}