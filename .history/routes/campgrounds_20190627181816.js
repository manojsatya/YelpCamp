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
router.post("/", isLoggedIn, function(req, res){  
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
    
    // create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            //console.log(newlyCreated);
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });    
});

//NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});


//SHOW ROUTE
router.get("/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            //console.log(foundCampground);
            // render show template with that id
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });      
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", function(req, res){
    // if logged in
    if(req.isAuthenticated()){
        
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("/campgrounds");
            } else{
                // does user own a campground?                
                if(foundCampground.author.id.equals(req.user._id)){
                    res.render("campgrounds/edit", {campground: foundCampground});
                } else{
                    res.send("You need to log in");
                }
                
            }
        });
    }else {
        console.log("You need to log in");
        res.send("You need to log in");
    }
    
    // otherwise redirect
        
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
    //find and update the correct campground
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect somewhere
});


//DESTROY CAMPGROUND ROUTE
router.delete("/:id", function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    })
});



//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;