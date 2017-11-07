let express    = require('express'),
	pug 	   = require('pug'),
	requireFu  = require('require-fu'),
	fs		   = require('fs'),
	session    = require('express-session'),
	bodyParser = require('body-parser');
	
//----------------------------------------------------------------------------------------
// Option config

let fileContents = fs.readFileSync('config.json','utf8');
let cfg = JSON.parse(fileContents);

//----------------------------------------------------------------------------------------
// Express Settings

// req.session.**
let db = require('./database/utils/DataBaseUtils.js');
db.setUpConnection();

let sessionOpt = {
  secret: 'skey',
  cookie: {}
}

let app = express();
app.set('view engine', 'pug');

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({     
  extended: true
})); 

app.use(session(sessionOpt));
app.use(express.static('public_files'));	// Public access

requireFu(__dirname + '/routes')(app, db);

app.listen(cfg['PORT'], () => {
  console.log(`Express server running on port ${cfg['PORT']}!`);
});