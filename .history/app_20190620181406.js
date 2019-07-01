var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds")

//seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



// Schema setup


app.get("/", function(req, res){
    res.render("landing");
});

//INDEX ROUTE
app.get("/campgrounds", function(req, res){
    // get all campgrounds rom db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index",{campgrounds:allcampgrounds});
        }
    });
});

//FORM ROUTE
app.post("/campgrounds", function(req, res){  
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
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});


//SHOW ROUTE
app.get("/campgrounds/:id", function(req, res){
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

//========================
// COMMENTS ROUTES
//========================
app.get("/campgrounds/:id/comments/new", function(req, res){
    res.render("comments/new");
})

app.listen(3000, function(){
    console.log("The YelpCamp Server has started");
});