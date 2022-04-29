//jshint esversion:6

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const _ = require("lodash");
// const ejs = require("ejs");
//
// router.set('view engine', 'ejs');

var Product=require("../models/products");
var CarouselElement=require("../models/carouselElements");

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.static("public"));

router.get("/", function(req, res){

//Setup Slider and Product cards
  CarouselElement.find({}, function(err, carouselElements){
    if (err) {
      console.log("Error connecting to db in the index.ejs");
    }
    else {
      Product.find({}, function(err, products){
        if (err) {
          console.log("Error connecting to db in the index.ejs");
        }
        else {
          res.render("index.ejs", {carouselElements:carouselElements, products:products});
        }
      });

    }
  });


  // Product.find({}, function(err, products){
  //   if (err) {
  //     console.log("Error connecting to db in the index.ejs");
  //   }
  //   else {
  //     res.render("index.ejs", {products:products});
  //   }
  // });


});

// router.get("/product/:productName", function(req, res){
//
//   const requestedName = _.lowerCase(req.params.productName);
//
//   Product.find({}, function(err, products){
//     if (err) {
//       console.log("Error connecting to db in the index.ejs");
//     }
//     else {
//       products.forEach(function(product){
//         const storedName = _.lowerCase(product.name);
//         if(storedName === requestedName){
//         res.render("product.ejs", {image: product.imagePath, name: product.name, description: product.description});
//       }
//     });
//
//     }
//   });
// });

router.get("/product/:id", function(req, res){

  Product.findById(req.params.id, function(err, product){
    if (err) {
      console.log("Error connecting to db in the index.ejs");
    }
    else {
        res.render("product.ejs", {image: product.imagePath, name: product.name, description: product.description});
    }
  });
});

router.get("/signin", function(req, res){
  res.render("signin.ejs");

});

router.get("/register", function(req, res){
  res.render("register.ejs");

});
module.exports = router;
