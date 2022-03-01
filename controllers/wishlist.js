const Wishlist = require('../models/Wishlist');

exports.addItemToFav = (req,res)=>{
    const productId = req.params.id;
      const favItemData = new Wishlist({
        wishItems: productId,
        user: req.user._id
      });
      favItemData.save()
        .then(function (FavItemSuccess) {
          res
            .status(200)
            .json({ success: true });
        })
        .catch(function (error) {
          res.status(500).json({ success: false, message: error });
        });
    }
    
    


exports.getFavItems=(req,res)=>{
    Wishlist.find({user:req.user._id})
    .populate('wishItems')
    .populate('user')
    .then(function(data){
        res.status(200).json({ success: true, data: data });
    })
    .catch(function(error){
        res.status(500).json({ success: false, message: error });
    })
}

exports.deleteFavItems=(req,res)=>{
  const wishId=req.params.id;
  Wishlist.deleteOne({_id:wishId})
  .then(function(result){
      res.status(201).json({ message:"Favourite item removed",success:true});

  })
  .catch(function(err){
      res.status(500).json({message:"Favourite item not found"})
  });
}