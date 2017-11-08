//----------------------------------------------------------------------------------------
// Socket.io index action module

let SocketIOFileUpload = require('socketio-file-upload'),
	fs 				   = require('fs'),
	FileManipulator    = require('../modules/FileManipulator.js');

//----------------------------------------------------------------------------------------
// Option config

let fileContents = fs.readFileSync('config.json','utf8');
let cfg = JSON.parse(fileContents);


module.exports = (io, db) => {

	io.on('connection', (socket) => {
	    let uploader = new SocketIOFileUpload();
	    uploader.dir = "uploads";
	    uploader.listen(socket);


	    uploader.on("start", (event) => {
	    	if ( event.file.size > cfg['MAX_FILE_SIZE'] ){
	        	uploader.abort(event.file.id, socket);
	    	}
	    })
	    uploader.on("saved", (event) => {
	        console.log("File successfully loaded");
	        FileManipulator.compress(event.file.pathName);
	    });

	    // Errors:
	    uploader.on("error", (event) => {
	        console.log("Error from uploader", event);
	        let pathName = event.file.pathName;
	        fs.unlinkSync(pathName);
	    });
	});
}