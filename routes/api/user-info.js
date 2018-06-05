let Logger  = require('../../modules/logger.js');

//----------------------------------------------------------------------------------------
// json user info

module.exports = (app, db) => {
	app.get('/api/user', (req, res) => {
		let user = req.session.userData;
		if ( user ){
			db.Users.get(user._id)
				.then(data => {
					data.password = undefined;
					data.status = undefined;
					res.json(data);
				})
				.catch(err => res.json({type: 'error', message: 'User error!'}));
		}	
		else {
			res.json({type: 'error', message: 'Access denied'})
		}
	})
}