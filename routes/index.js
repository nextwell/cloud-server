module.exports = (app) => {
	app.get('/', (req, res) => {
		 res.render('index', { title: 'Главная страница', message: 'Добро пожаловать'});
	})
}