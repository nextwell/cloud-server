//----------------------------------------------------------------------------------------
// Socket.io index action module

let fs 				   = require('fs');

//----------------------------------------------------------------------------------------
// Option config

let fileContents = fs.readFileSync('config.json','utf8');
let cfg = JSON.parse(fileContents);

module.exports = (io, db, SocketIOFileUpload) => {

	io.on('connection', function (socket) {
	    let uploader = new SocketIOFileUpload();
	    uploader.dir = "uploads";
	    uploader.listen(socket);


	    uploader.on("start", (event) => {
	    	if ( !socket.request.session.userData ){
	    		uploader.abort(event.file.id, socket);
	    	}
	    	if ( event.file.size > cfg['MAX_FILE_SIZE'] ){
	        	uploader.abort(event.file.id, socket);
	    	}
	    })
	    uploader.on("saved", (event) => {
	        console.log("File successfully loaded");
	        db.File.create({
	        	userID: socket.request.session.userData._id,
	        	name: event.file.name, 
	        	fileURL: event.file.pathName,
	        	size: event.file.size
	        })
	    });

	    // Errors:
	    uploader.on("error", (event) => {
	        console.log("Error from uploader", event);
	        let pathName = event.file.pathName;
	        fs.unlinkSync(pathName);
	    });
	});
}