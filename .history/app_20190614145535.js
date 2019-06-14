var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Manoj Satya", image: "https://img-aws.ehowcdn.com/340x221p/photos.demandstudios.com/getty/article/110/101/87793201.jpg"},
    {name: "Shradha Shiv", image: "https://img-aws.ehowcdn.com/340x221p/photos.demandstudios.com/getty/article/110/101/87793201.jpg"},
    {name: "Meghana", image: "https://img-aws.ehowcdn.com/340x221p/photos.demandstudios.com/getty/article/110/101/87793201.jpg"}
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