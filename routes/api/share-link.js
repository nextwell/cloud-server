let Logger  = require('../../modules/logger.js');

//----------------------------------------------------------------------------------------
// json user info

module.exports = (app, db) => {
	app.get('/api/share/:id', (req, res) => {
		let user = req.session.userData;
		if ( user ){
			let fileId = req.params.id;
			db.File.search({_id: fileId})
				.then(data => {
					data = data[0];
					if(data.userID != user._id ){
						res.json({type: 'error', message: 'Access denied'})
					}
					else {
						db.File.update({_id: fileId});
						res.json({action: true, link: `/file/${fileId}`})
					}
				})
		}	
		else {
			res.json({type: 'error', message: 'Access denied!'})
		}
	})
}