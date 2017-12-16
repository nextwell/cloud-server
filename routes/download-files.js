let path 	= require('path'),
	fs 		= require('fs'),
	Logger  = require('../modules/logger.js');
//----------------------------------------------------------------------------------------
// page with download function

module.exports = (app, db) => {
	app.get('/download/:id', (req, res) => {
		db.File.search({_id: req.params.id })
			.then(data => {
				if ( data[0].userID == req.session.userData._id || data.status == 'open' ){
					res.download(path.resolve(data[0].fileURL));
					Logger.write({source: "Express routes", action: "INFO", text: `File successfully downloaded | id: ${data[0]._id}`})
				}
				else{
					res.send("Файл не найден!");
				}
			})
			.catch(err => {
				res.send("Файл не найден!")
			})
	})
}