var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
/* 
Campground.create(
    {
        name: "Shradha Shiv", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5b9dOfcfle_RwfdPS21qwfn5kcQ_BfHuL4uoVApARc1INLCfp"
    }, function(err, campground){
        if(err){
            console.log(err);
        } else{
            console.log("NEWLY CREATED CAMPGROUND");
            console.log(campground);
        }
    }); */

/* var campgrounds = [
    {name: "Manoj Satya", image: "https://static.rootsrated.com/image/upload/s--_i1nqUT1--/t_rr_large_traditional/oy9xsbijv8wehnrzv0zt.jpg"},
    {name: "Shradha Shiv", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5b9dOfcfle_RwfdPS21qwfn5kcQ_BfHuL4uoVApARc1INLCfp"},
    {name: "Meghana", image: "http://hudsonshope.ca/wp-content/uploads/2016/10/Inflatable-Boat.jpg"},
    {name: "Manoj Satya", image: "https://static.rootsrated.com/image/upload/s--_i1nqUT1--/t_rr_large_traditional/oy9xsbijv8wehnrzv0zt.jpg"},
    {name: "Shradha Shiv", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5b9dOfcfle_RwfdPS21qwfn5kcQ_BfHuL4uoVApARc1INLCfp"},
    {name: "Meghana", image: "http://hudsonshope.ca/wp-content/uploads/2016/10/Inflatable-Boat.jpg"},
    {name: "Manoj Satya", image: "https://static.rootsrated.com/image/upload/s--_i1nqUT1--/t_rr_large_traditional/oy9xsbijv8wehnrzv0zt.jpg"},
    {name: "Shradha Shiv", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5b9dOfcfle_RwfdPS21qwfn5kcQ_BfHuL4uoVApARc1INLCfp"},
    {name: "Meghana", image: "http://hudsonshope.ca/wp-content/uploads/2016/10/Inflatable-Boat.jpg"},
    {name: "Manoj Satya", image: "https://static.rootsrated.com/image/upload/s--_i1nqUT1--/t_rr_large_traditional/oy9xsbijv8wehnrzv0zt.jpg"},
    {name: "Shradha Shiv", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5b9dOfcfle_RwfdPS21qwfn5kcQ_BfHuL4uoVApARc1INLCfp"},
    {name: "Meghana", image: "http://hudsonshope.ca/wp-content/uploads/2016/10/Inflatable-Boat.jpg"}
] */

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // get all campgrounds rom db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds",{campgrounds:allcampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){  
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
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

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});


app.listen(3000, function(){
    console.log("The YelpCamp Server has started");
});