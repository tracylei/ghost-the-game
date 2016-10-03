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
    done(null, {_id: user.id, username: user.username});
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.route('/login')
	.get(function(req, res){
        if(!req.isAuthenticated())
            res.render('index');
        else
            res.redirect('/');
	})
	.post(passport.authenticate('local'), function(req, res){
		res.sendStatus(200);
	});

router.route('/signup')
    .get(function(req, res){
        if(!req.isAuthenticated())
            res.render('index');
        else
            res.redirect('/');
    })
	.post(function(req, res){

		User.findOne({'username': req.body.username}, function(user){
			if (user == null) {
				var user = new User();
				user.username = req.body.username;
				user.password = req.body.password;
				user.save(function(err){
					if(err)
						res.json({"message": err});
					else
						res.json({"message": "Success"});
				});
			}
			else {
				console.log("Username unavailable");
				res.json({"message": "UsernameUnavailableError"});
			}
		});

		
	});

module.exports = router;