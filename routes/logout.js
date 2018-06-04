//----------------------------------------------------------------------------------------
// Quit page / Destroy session

let Logger  = require('../modules/logger.js');


module.exports = (app, db) => {
	app.get('/logout', (req, res) => {
		if ( req.session.userData ){
			Logger.write({source: "Express routes", action: "DEBUG", text:`User quit | id: ${req.session.userData._id}`})
			req.session.userData = null;
			res.redirect('/');
		} else{
			res.redirect('/');
		}
	})
}