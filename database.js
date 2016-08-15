var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydatabase', {ssl: true, sslValidate: false});
mongoose.set('debug', true);


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	console.log('Successfully connected to the database!');
});

module.exports = db;