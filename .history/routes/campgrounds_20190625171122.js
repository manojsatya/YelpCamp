var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX ROUTE
router.get("/", function(req, res){
    console.log(req.user);
    // get all campgrounds rom db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds:allcampgrounds, currentUser: req.user});
        }
    });
});

//CREATE ROUTE - add new campground to DB
router.post("/campgrounds", function(req, res){  
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });    
});

//NEW ROUTE
router.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});


//SHOW ROUTE
router.get("/campgrounds/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            // render show template with that id
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });      
});

module.exports = router;