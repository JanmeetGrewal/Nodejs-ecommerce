//jshint esversion:6

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-janmeet:janmeet46@cluster0-gg9zf.mongodb.net/shopDB", {useNewUrlParser: true});


const carouselElementSchema=new mongoose.Schema({
   imagePath:String,

});

module.exports=mongoose.model("CarouselElement",carouselElementSchema);
