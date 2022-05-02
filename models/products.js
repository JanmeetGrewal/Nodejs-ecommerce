//jshint esversion:6

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-janmeet:janmeet46@cluster0-gg9zf.mongodb.net/shopDB", {useNewUrlParser: true});

const productSchema=new mongoose.Schema({
  productCode: {
    type: String,
    unique: true
  },
   imagePath:String,
   brand:String,
   name:String,
   description:String,
   category:String,
   price:Number
});

module.exports=mongoose.model("Product",productSchema);
