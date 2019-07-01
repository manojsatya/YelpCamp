var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds")

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



// Schema setup


/* Campground.create(
    {
        name: "Shradha Shiv", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5b9dOfcfle_RwfdPS21qwfn5kcQ_BfHuL4uoVApARc1INLCfp",
        description: "This is a good place to spend the night. Awesome weather and rainy and moody and sexy."
    }, function(err, campground){
        if(err){
            console.log(err);
        } else{
            console.log("NEWLY CREATED CAMPGROUND");
            console.log(campground);
        }
    }); */



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
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            // render show template with that id
            res.render("show", {campground:foundCampground});
        }
    });
    
    
})

app.listen(3000, function(){
    console.log("The YelpCamp Server has started");
});