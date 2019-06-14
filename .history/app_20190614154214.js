var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Manoj Satya", image: "https://www.holland.org/sites/default/files/styles/slideshow_largest/public/mmg_lfef_images/holland-state-park-campgrounds-668-1078.jpg?itok=Zd6RBqYn"},
    {name: "Shradha Shiv", image: "https://www.holland.org/sites/default/files/styles/slideshow_largest/public/mmg_lfef_images/holland-state-park-campgrounds-668-1078.jpg?itok=Zd6RBqYn"},
    {name: "Meghana", image: "https://www.holland.org/sites/default/files/styles/slideshow_largest/public/mmg_lfef_images/holland-state-park-campgrounds-668-1078.jpg?itok=Zd6RBqYn"}
]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){  
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});


app.listen(3000, function(){
    console.log("The YelpCamp Server has started");
});