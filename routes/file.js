//----------------------------------------------------------------------------------------
// File information

module.exports = (app, db) => {
	app.get('/file/:id', (req, res) => {
		db.File.search({_id: req.params.id })
			.then(data => {
				if ( data[0].userID == req.session.userData._id || data.status == 'open' ){
					res.render('file', { title: `Информация о файле ${data[0].name}`, file: data[0]});
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