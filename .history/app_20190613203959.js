var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Manoj Satya", image: ""}
        {name: "Shradha Shiv", image: ""}
        {name: "Meghana", image: ""}
    ]
});


app.listen(3000, function(){
    console.log("The YelpCamp Server has started");
});