let path 			= require('path'),
	fs 				= require('fs');
//----------------------------------------------------------------------------------------
// page width download function

module.exports = (app, db) => {
	app.get('/download/:id', (req, res) => {
		db.File.search({_id: req.params.id })
			.then(data => {
				if ( data[0].userID == req.session.userData._id || data.status == 'open' ){
					res.download(path.resolve(data[0].fileURL));
				}
				else{
					res.send("File not found or hidden!");
				}
			})
			.catch(err => {
				res.send("File not found or hidden!")
			})
		//res.download(path.resolve(`uploads/test.txt`));
	})
}