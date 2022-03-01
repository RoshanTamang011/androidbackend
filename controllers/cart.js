const Cart = require('../models/cart');

exports.addItemToCart = (req,res)=>{
    const productId = req.params.id;
      const CartItemData = new Cart({
        cartItems: productId,
        user: req.user._id
      });
      CartItemData.save()
        .then(function (CartItemSuccess) {
          res
            .status(200)
            .json({ success: true });
        })
        .catch(function (error) {
          res.status(500).json({ success: false, message: error });
        });
    }
    
    


exports.getCartItems=(req,res)=>{
    Cart.find({user:req.user._id})
    .populate('cartItems')
    .populate('user')
    .then(function(data){
        res.status(200).json({ success: true, data: data });
    })
    .catch(function(error){
        res.status(500).json({ success: false, message: error });
    })
}


exports.deleteCartItems=(req,res)=>{
  const cartId=req.params.id;
  Cart.deleteOne({_id:cartId})
  .then(function(result){
      res.status(201).json({ message:"Cart item removed",success:true});

  })
  .catch(function(err){
      res.status(500).json({message:"Cart item not found"})
  });
}