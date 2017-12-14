//----------------------------------------------------------------------------------------
// Login / Sign-in Page

let	Logger  = require('../modules/logger.js'),
	fsEx	= require('fs-extra');

module.exports = (app, db) => {
	app.get('/remove/:id', (req, res) => {

		// remove from db

		db.File.remove({_id: req.params.id })
			.then(data => {
				let item = data;

				Logger.write({source: "Express routes", action: "INFO", text: `File successfully removed | id: ${item._id}`});

				// remove from file system
				let filePath = item.fileURL,
					folder = item.fileURL.replace(`${item.name}`,'');

				fsEx.remove(folder);

			})
			.catch(err => {
				Logger.write({source: "Express routes", action: "ERR", text: `Error file removing! | id: ${req.params.id}`});
			});


		res.redirect('/home');
			
	})
}