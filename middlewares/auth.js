// const jwt=require('jsonwebtoken');
// const User = require('../models/userModel');

// module.exports.verifyUser = function(req,res,next){
//     const token =req.headers.authorization.split(" ")[1]; ///token only
//     const data = jwt.verify(token,'secretKey');//now we have id
//     User.findOne({_id:data.userId})
//     .then(function(result){
//         req.user=result;
//         next();
//     })
//     .catch(function(er){
//         res.status(401).json({message : "Auth failed !"})

//     })
//    }