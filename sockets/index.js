//----------------------------------------------------------------------------------------
// Socket.io index action module
let SocketIOFileUpload = require('socketio-file-upload'),
	fs 				   = require('fs'),
	FileManipulator    = require('../modules/FileManipulator.js');

module.exports = (io, db) => {

	io.on('connection', function (socket) {
	    let uploader = new SocketIOFileUpload();
	    uploader.dir = "uploads";
	    uploader.listen(socket);

	    uploader.on("saved", function(event){
	        console.log("File successfully loaded");
	        //FileManipulator.compress(event.file.pathName);
	    });

	    // Error handler:
	    uploader.on("error", function(event){
	        console.log("Error from uploader", event);
	        let pathName = event.file.pathName;
	        fs.unlinkSync(pathName);
	    });
	});
}