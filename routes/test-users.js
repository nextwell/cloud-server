module.exports = (app, db) => {
	app.get('/test-users', (req, res) => {
		db.Users.list()
			.then(data => res.send(data))
			.catch(error => res.send(error));
	})
}