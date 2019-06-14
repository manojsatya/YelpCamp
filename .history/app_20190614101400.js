var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Manoj Satya", image: "https://mk0theadventuregfnyq.kinstacdn.com/wp-content/uploads/Tips-for-Hiking-and-Camping-in-the-Snow-3.jpg"},
        {name: "Shradha Shiv", image: "https://www.michigan.org/sites/default/files/styles/15_6_desktop/public/camping-hero_0_0.jpg?itok=mgGs0-vw&timestamp=1520373602"},
        {name: "Meghana", image: "https://taosmountainoutfitters.com/wp-content/uploads/2018/09/camping_fullsize_story1.jpg"}
    ]

    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    res.send("You hot the post route!!");
    //get data from form and add to campground array
    //redirect back to campgrounds page
});


app.listen(3000, function(){
    console.log("The YelpCamp Server has started");
});