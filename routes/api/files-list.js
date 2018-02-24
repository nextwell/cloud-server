let Logger  = require('../../modules/logger.js');

//----------------------------------------------------------------------------------------
// json files list

module.exports = (app, db) => {
	app.get('/api/files', (req, res) => {
		let user = req.session.userData;
		if ( user ){
			db.File.search({userID: user._id })
				.then(data => {
					data.forEach(function(item, i, arr){
						item.fileURL = undefined;
						item.userID = undefined;
					})
					res.json(data);
				})
				.catch(err => {
					res.json({type: 'error', message: 'Empty user'})
				})
		}	
		else {
			res.json({type: 'error', message: 'No success!'})
		}
	})
}