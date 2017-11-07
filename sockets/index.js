//----------------------------------------------------------------------------------------
// Socket.io index action module

module.exports = (io, db) => {

	io.on('connection', function (socket) {
	    socket.emit('news', { msg: socket.request.session.userData });
	});
}