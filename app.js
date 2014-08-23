var restify = require('restify');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	date: Date,
	calle: String,
	colonia: String,
	comentarios: String,
	correo: String, 
	delegacion: String,
	empresa: String,
	estado: String, 
	folio: String,
	nombre: String,
	num_exterior: String,
	num_interior: String, 
	telefono: String,
	codigo_postal: String,
	tipo: String
});

var connection;

connection = mongoose.connect('mongodb://vipal:llo0ba4ca@ds053469.mongolab.com:53469/registro', function(err){
	if(err)
		console.log('Erorr a conectar con la base de datos');
});

var User = mongoose.model('User', UserSchema);


var server = restify.createServer({
    name: 'vipal concursos',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/users', function (req, res, next) {
	var fetchedPerson;

  	/*
  	* Fetching registered users from repository
  	*/ 
    User.find({ survey : { $exists : false } }, function(err, person){
  	if(!err)
  		res.send(person);
  	});
  
  next();
});

server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});