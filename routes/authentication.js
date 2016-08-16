var express 		= require('express');
var passport 		= require('passport');
var LocalStrategy 	= require('passport-local').Strategy;
var User 			= require('../models/user');
var router 			= express.Router();

passport.use(new LocalStrategy(
	function(username, password, done){
		console.log("trying to authenticate");
		User.findOne({ username: username }, function(err, user){
			if(err) return done(err);
			if(!user) return done(null, false);
			//if (!user.verifyPassword(password)) return done(null, false);
			return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
    done(null, {_id: user.id});
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.route('/login')
	.get(function(req, res){
		res.render('index');
	})
	.post(passport.authenticate('local'), function(req, res){
		res.sendStatus(200);
	});

router.route('/signup')
	.post(function(req, res){
		var user = new User();
		user.username = req.username;
		user.password = req.password;
		user.save(function(err){
			if(err)
				res.send(err);
			else
				res.sendStatus(200);
		});
	});

module.exports = router;