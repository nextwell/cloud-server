let Logger  = require('../modules/logger.js');
//----------------------------------------------------------------------------------------
// page with download function

module.exports = (app, db) => {
	app.get('/verify/:id', (req, res) => {
		db.Users.update({_id: req.params.id})
		res.send("Ваш аккаунт активирован.<br><a href='/login'>Войти</a>")
	})
}