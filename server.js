let express            = require('express'),
	pug 	           = require('pug'),
	requireFu          = require('require-fu'),
	fs		           = require('fs'),
	session            = require('express-session'),
	bodyParser 	       = require('body-parser'),
	SocketIOFileUpload = require('socketio-file-upload');
	
//----------------------------------------------------------------------------------------
// Option config

let fileContents = fs.readFileSync('config.json','utf8');
let cfg = JSON.parse(fileContents);

//----------------------------------------------------------------------------------------
// Express Settings

// req.session.**
let db = require('./database/utils/DataBaseUtils.js');
db.setUpConnection();

/*let sessionOpt = {
  secret: 'skey',
  cookie: {}
}*/

let sessionMiddleware = session({
    secret: "skey"
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
  console.log(`Express server running on port ${cfg['PORT']}!`);
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