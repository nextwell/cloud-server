//----------------------------------------------------------------------------------------
// Just a testing page / Show all files

module.exports = (app, db) => {
	app.get('/test-files', (req, res) => {
		db.File.list()
			.then(data => res.send(data))
			.catch(error => res.send(error));
	})
}