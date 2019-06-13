var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.render("landing");
});


app.listen(3000, function(){
    console.log("The YelpCamp Server has started");
});