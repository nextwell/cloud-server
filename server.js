let express            = require('express'),
	pug 	           = require('pug'),
	requireFu          = require('require-fu'),
	fs		           = require('fs'),
	session            = require('express-session'),
	bodyParser 	       = require('body-parser'),
	SocketIOFileUpload = require('socketio-file-upload'),
	Logger 			   = require('./modules/logger.js');
	
//----------------------------------------------------------------------------------------
// Option config

let fileContents = fs.readFileSync('config.json','utf8');
let cfg = JSON.parse(fileContents);

//----------------------------------------------------------------------------------------
// Express Settings

// req.session.**
let db = require('./database/utils/DataBaseUtils.js');
db.setUpConnection();

let sessionMiddleware = session({
    secret: "skey",
    resave: true,
    saveUninitialized: true
});

let app = express();
app.set('view engine', 'pug');

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({     
  extended: true
})); 


app.use(sessionMiddleware);

app.use(express.static('public_files'));	// Public access

app.use(SocketIOFileUpload.router);		// files uploader progress

requireFu(__dirname + '/routes')(app, db);

app.listen(cfg['PORT'], () => {
    Logger.write({source: "Express", action: "INFO", text:`Express server running on port ${cfg['PORT']}!`});
});

//----------------------------------------------------------------------------------------
// Socket.io Settings

let server = require('http').Server(app);
let io = require("socket.io")(server);

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

requireFu(__dirname + '/sockets')(io, db, SocketIOFileUpload);		// require all sockets

server.listen(8081);



// POST UPLOADER


let upload = require('jquery-file-upload-middleware'),
	mkdirp = require('mkdirp');

upload.configure({
    uploadDir: __dirname + '/uploads/',
    uploadUrl: '/uploads'
});


app.get('/upload', function( req, res ){
	res.redirect('/');
});

app.put('/upload', function( req, res ){
	res.redirect('/');
});

app.delete('/upload', function( req, res ){
	res.redirect('/');
});

app.use('/upload', function(req, res, next){
    upload.fileHandler({
        uploadDir: function () {
            return __dirname + '/uploads/'
        },
        uploadUrl: function () {
            return '/uploads'
        }
    })(req, res, next);


    
});

upload.on('end', async function (fileInfo, req, res) {
	let time     = new Date(),
	    dirTime  = time.getTime(),
	    dirStr   =  Math.random()
	    				.toString(36)
	    				.slice(2, 2 + Math.max(1, Math.min(15, 25)) ),
	    finalDir = `${dirTime}${dirStr}`;

	    let datesDir = `${cfg["UPLOAD_DIR"]}/${time.getFullYear()}-${parseInt(time.getMonth()+1)}-${time.getDate()}`;

	    await mkdirp(datesDir, (err) => { /* nothing ¯\_(ツ)_/¯ */ });
	    await mkdirp(`${datesDir}/${finalDir}`, (err) => { 
			if ( err ) Logger.write({source: "POST Uploader", action: "ERR", text:`Trying to create dir after save, but dir already exist!`});
		});
	  
	    
	
	// --------	// 
	// File move to unique dir
	let newPath = `${datesDir}/${finalDir}/${fileInfo.name}`;
    fs.rename(
	    `./uploads/${fileInfo.name}`,
	    newPath,
	    function( err ) { /* nothing ¯\_(ツ)_/¯ */ }
	)

	db.File.create({
    	userID: req.session.userData._id,
    	name: fileInfo.name, 
    	fileURL: newPath,
    	size: fileInfo.size
    }) 
});