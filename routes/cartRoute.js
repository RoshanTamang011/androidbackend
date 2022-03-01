const express = require("express");
const router=express.Router();
const {addItemToCart, getCartItems, deleteCartItems } = require("../controllers/cart");
const { requireSignin, userMiddleware } = require("../common-middleware");


router.post('/user/cart/addtocart/:id', requireSignin,userMiddleware,addItemToCart);  
router.get('/user/cart/getCartItems', requireSignin,userMiddleware,getCartItems);
router.delete('/user/cart/deleteCartItems/:id', requireSignin,userMiddleware,deleteCartItems);




module.exports=router;