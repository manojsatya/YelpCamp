var express = require("express");
var app = express;

app.length("/", function(req, res){
    res.send("This will be our landing page");
});


app.listen(3000, function(){
    console.log("The YelpCamp Server has started");
});