var express 		= require('express');
var passport 		= require('passport');
var LocalStrategy 	= require('passport-local').Strategy;
//var User 			= require('./models/user');
var router 			= express.Router();

passport.use(new LocalStrategy(
	function(username, password, done){
		console.log("trying to authenticate");
		return done(null, {});
		// User.findOne({ username: username }, function(err, user){
		// 	if(err) return done(err);
		// 	if(!user) return done(null, false);
		// 	if (!user.verifyPassword(password)) return done(null, false);
		// 	return done(null, user);
		// });
	}
));

passport.serializeUser(function(user, done) {
    done(null, {_id: user.id});
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.route('/login')
		.post(passport.authenticate('local'), function(req, res){
			res.sendStatus(200);
		});

module.exports = router;