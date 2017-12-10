//----------------------------------------------------------------------------------------
// Socket.io index action module

let fs 		= require('fs'),
	mkdirp 	= require('mkdirp'), 	// Module for making directories.
	Logger  = require('../modules/logger.js');

//----------------------------------------------------------------------------------------
// Option config

let fileContents = fs.readFileSync('config.json','utf8');
let cfg = JSON.parse(fileContents);

module.exports = (io, db, SocketIOFileUpload) => {

	io.on('connection', (socket) => {
		Logger.write({source: "SocketIO", action: "DEBUG", text:`User connected`});

		socket.on('disconnect', function () {
	    	io.emit('disconnected');
	    	Logger.write({source: "SocketIO", action: "DEBUG", text:`User disconnected`});
	    });

	    let uploader = new SocketIOFileUpload();
	    uploader.dir = `uploads`;
	    uploader.listen(socket);


	    uploader.on("start", (event) => {
	    	if ( !socket.request.session.userData ){
	    		uploader.abort(event.file.id, socket);
	    	}
	    	if ( event.file.size > cfg['MAX_FILE_SIZE'] ){
	        	uploader.abort(event.file.id, socket);
	    	}
	    })
	    uploader.on("saved", async (event) => {
	        Logger.write({source: "Uploader SocketIO", action: "INFO", text:`File successfully uploaded`});
	        

	        // --------	// Create unique dir
			let time     = new Date(),
			    dirTime  = time.getTime(),
			    dirStr   =  Math.random()
			    				.toString(36)
			    				.slice(2, 2 + Math.max(1, Math.min(15, 25)) ),
			    finalDir = `${dirTime}${dirStr}`;

			    let datesDir = `${cfg["UPLOAD_DIR"]}/${time.getFullYear()}-${parseInt(time.getMonth()+1)}-${time.getDate()}`;

			    await mkdirp(datesDir, (err) => { /* nothing ¯\_(ツ)_/¯ */ });
			    await mkdirp(`${datesDir}/${finalDir}`, (err) => { 
					if ( err ) Logger.write({source: "Uploader SocketIO", action: "ERR", text:`Trying to create dir after save, but dir already exist!`});
				});
			  
			    
			
			// --------	// 
			// File move to unique dir
			let newPath = `${datesDir}/${finalDir}/${event.file.name}`;
	        fs.rename(
			    event.file.pathName,
			    newPath,
			    function( err ) { /* nothing ¯\_(ツ)_/¯ */ }
			)

			db.File.create({
	        	userID: socket.request.session.userData._id,
	        	name: event.file.name, 
	        	fileURL: newPath,
	        	size: event.file.size
	        })
	    });

	    // Errors:
	    uploader.on("error", (event) => {
	        Logger.write({source: "Uploader SocketIO", action: "ERR", text:`Error from uploader`});
	        let pathName = event.file.pathName;
	        fs.unlinkSync(pathName);
	    });
	});
}