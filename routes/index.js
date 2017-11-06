module.exports = (app) => {
	app.get('/', (req, res) => {
		 res.render('index', { title: 'Index page', message: 'Just a message from index page :)'});
	})
}