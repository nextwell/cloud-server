let Logger  = require('../modules/logger.js');
//----------------------------------------------------------------------------------------
// page with download function

module.exports = (app, db) => {
	app.get('/verify/:id', (req, res) => {
		db.Users.update({_id: req.params.id, action: { status: "true" }})
			.then(data => {
				res.send("Ваш аккаунт активирован.<br><a href='/login'>Войти</a>")
			})
			.catch(error => {
				console.log(error);
				res.send("Произошла неизвестная ошибка!");
			})
	})
}