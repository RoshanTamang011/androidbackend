const express = require("express");
const router=express.Router();
const { requireSignin, userMiddleware } = require("../common-middleware");
const { addItemToFav, getFavItems,deleteFavItems } = require("../controllers/wishlist");


router.post('/user/wish/addtofav/:id', requireSignin,userMiddleware,addItemToFav);  
router.get('/user/wish/getfavitems', requireSignin,userMiddleware,getFavItems);  
router.delete('/user/wish/deleteFavItems/:id', requireSignin,userMiddleware,deleteFavItems);






module.exports=router;