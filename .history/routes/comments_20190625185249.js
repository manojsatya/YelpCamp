var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


// comments new
router.get("/new", isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//comments create
router.post("/", isLoggedIn ,function(req, res){
    //lookup campground by Id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   // add username and id to comment
                   console.log("New comments: " + req.user.username); 
                   // save comment
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/"+ campground._id);
               }
            });
        }
    });
    // create new comment
    // connect new comment to campground
    // redirect to campground showpage
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;