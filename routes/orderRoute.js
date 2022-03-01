const express=require('express');
const router =express.Router();
const { requireSignin, userMiddleware, adminMiddleware } = require('../common-middleware');
const { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders } = require('../controllers/order');

router.post('/user/order/addOrder',requireSignin,addOrderItems)

router.get('/user/order/:id',requireSignin,getOrderById)

router.put('/order/:id/pay',requireSignin,updateOrderToPaid)

router.put('/order/:id/deliver',requireSignin,adminMiddleware,updateOrderToDelivered)

router.get('/order/myorders',requireSignin,getMyOrders)

router.get('/orders',requireSignin,adminMiddleware,getOrders)
module.exports=router;
