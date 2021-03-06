var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Manoj Satya", image: "https://mk0theadventuregfnyq.kinstacdn.com/wp-content/uploads/Tips-for-Hiking-and-Camping-in-the-Snow-3.jpg"},
    {name: "Shradha Shiv", image: "https://www.michigan.org/sites/default/files/styles/15_6_desktop/public/camping-hero_0_0.jpg?itok=mgGs0-vw&timestamp=1520373602"},
    {name: "Meghana", image: "https://taosmountainoutfitters.com/wp-content/uploads/2018/09/camping_fullsize_story1.jpg"}
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
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});


app.listen(3000, function(){
    console.log("The YelpCamp Server has started");
});