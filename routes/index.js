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
var Cart = require("../models/cart")

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

// Add to cart
router.get("/add-to-cart/:id", async function(req, res){

  let userCart;
  if (req.user) {
    userCart = await Cart.findOne({user: req.user._id});
  }
  let cart;
  if (
      (req.user && !userCart && req.session.cart) ||
      (!req.user && req.session.cart)
    ) {
      cart = new Cart(req.session.cart);
    } else if (!req.user || !userCart) {
      cart = new Cart({});
    } else {
      cart = userCart;
    }

    const productId = req.params.id;

    const product = await Product.findById(productId);
    const itemIndex = cart.items.findIndex(function (item){
      return item.productId == productId;
    });

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity++;
      cart.items[itemIndex].price = cart.items[itemIndex].qty * product.price;
      cart.totalQty++;
      cart.totalCost += product.price;
    }
    else {
      cart.items.push({
        productId: productId,
        quantity: 1,
        price: product.price,
        name: product.name,
        productCode: product.productCode,
      });
      cart.totalQuantity++;
      cart.totalCost += product.price;
    }

    if (req.user) {
      cart.user = req.user._id;
      cart.save();
    }

    req.session.cart = cart;
    res.redirect(req.headers.referer);


});

//Set up cart
router.get("/cart", async function (req, res){
  let userCart;

//If user is signed in
  if (req.user){
    userCart = await Cart.findOne({user: req.user._id})
  }

  if (req.user && userCart) {
    return res.render("cart.ejs", {items: userCart.items})
  }

//If user is not signed in but there is a cart in session
  let cart;

  if (req.session.cart) {
    cart = new Cart(req.session.cart);
    return res.render("cart.ejs", {items: cart.items})
  }

  else {
    return res.send("Your cart is empty")
  }
});

module.exports = router;
