//----------------------------------------------------------------------------------------
// File information

module.exports = (app, db) => {
	app.get('/file/:id', (req, res) => {
		db.File.search({_id: req.params.id })
			.then(data => {
				let item = data[0];
				if ( req.session.userData && item.userID == req.session.userData._id || item.status == "open" ){
					res.render('file', { title: `Информация о файле ${item.name}`, file: item});
				}
				else{
					res.send("File not found or hidden!");
				}
			})
			.catch(err => {
				res.send("File not found or hidden!")
			})
	})
}