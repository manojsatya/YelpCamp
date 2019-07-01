var express = require("express"),
    app         = express();
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var flash = require("connect-flash");
app.use(flash());

//root route
router.get("/", function(req, res){
    res.render("landing");
});

//show register
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic route
router.post("/register", function(req, res){
    var newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//SHOW LOGIN FORM
router.get("/login", function(req, res){
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req, res){
});


//LOGOUT route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("error", "Logged you out!");
    res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;