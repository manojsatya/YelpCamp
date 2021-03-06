var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
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