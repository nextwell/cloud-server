let md5 = require('md5');


module.exports = (app, db) => {
	app.get('/settings', (req, res) => {
		if ( req.session.userData ){
			res.redirect('/home');
		} else res.redirect('/login');
	})
	app.post('/settings', (req, res) => {
		let formData = {
			name: req.body.name,
			password: md5(req.body.password),
			name: req.body.name,
			surname: req.body.surname
		};
		if ( req.body.new_password ) formData.new_password = md5(req.body.new_password);
		if ( req.body.new_password_2 ) formData.new_password_2 = md5(req.body.new_password_2);

		if ( formData.new_password != formData.new_password_2 ){
			res.json({type: 'error', msg: "Новые пароли не совпадают!"})
		}
		if ( req.session.userData ){
			let user = req.session.userData;
			db.Users.get(user._id)
				.then(data => {
					if (data.password != formData.password) res.json({type: 'error', msg: "Текущий пароль неверен!"})
					else{
						let newData = {};
						if ( formData.name ) newData.name = formData.name;
						if ( formData.surname ) newData.surname = formData.surname;
						if ( formData.new_password ) newData.password = formData.new_password;
						db.Users.update({ _id: user._id, action: newData })
							.then(data => {
								res.json({type: 'success', msg: 'Настройки успешно обновлены!'})
							})
							.catch(error => {
								res.json({type: 'error', msg: "Произошла ошибка, повторите попытку позже!"})
							})
					}
				})




		} else res.redirect('/login');
	})
}