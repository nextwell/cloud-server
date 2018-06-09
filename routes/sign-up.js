//----------------------------------------------------------------------------------------
// Sign Up Page

let md5     	 = require('md5'),
	Logger  	 = require('../modules/logger.js'),
	Verification = require('../modules/verification.js');

module.exports = (app, db) => {
	app.get('/signup', (req, res) => {
		if ( req.session.userData ){
			res.redirect('/login');
		} else{
			res.render('sign-up', { title: 'sign-up page'});
		}
	})
	app.post('/signup', (req, res) => {
		let data = {
			login: req.body.login,
			password: md5(req.body.password),
			name: req.body.name,
			surname: req.body.surname
		};
		db.Users.create(data)
			.then(data => { 
				Logger.write({source: "Express routes", action: "INFO", text: `Registration success | id: ${data._id}`})

				/* --- eMail verification --- */
				link=`http://${req.get('host')}/verify/${data._id}`;

			    mailOptions={
			        to : data.login,
			        subject : "Подтверждение E-mail Вашей учетной записи AkiteCloud",
			        html : `Здравствуйте.<br> Для активации аккаунта перейдите по этой ссылке.<br><a href="${link}">Подтвердить!</a>` 
			    }
			    Verification.smtp.sendMail(mailOptions, function(error, response){
				     if(error){ console.log(error) }
				     else{  }
			     })
				res.send("Подтвердите ваш электронный адрес!<br><a href='/login'>Войти</a>"); 
			})
			.catch( err => res.send("Ошибка, повторите попытку!"));

	})
}