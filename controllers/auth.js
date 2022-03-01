const User = require ("../models/userModel");
const jwt = require("jsonwebtoken");
const {validationResult} = require('express-validator')
const  asyncHandler =require ('express-async-handler');
const productModel = require("../models/productModel");

//const bcrypt = require("bcrypt");

//-------------------------------REGISTER-------------------------------------
exports.signup = (req,res) => {
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message: 'User already registered'
        });

        const {
            firstName,
            lastName,
            username,
            email,
            password
        }=req.body;
        
        const _user = new User ({firstName,lastName,email,password,username});
        const token = jwt.sign({_id: this._id, role:this.role},process.env.JWT_SECRET,{expiresIn:'1h'});

        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }

            if(data){
                return res.status(201).json({
                    success:true,
                    token:token,
                    message:"User registered successfully",
                    username:data.username,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    _id:data._id,
                    role:data.role,
                    email:data._email

                
                })
            }

        });
    });
    
};


//----------------------------------------LOGIN--------------------------

exports.login= (req,res)=>{
    User.findOne({email:req.body.email}).exec(async(error,user)=>{
        if(error) return res.status(400).json({error});

        if(user){
           const isPassword= await user.authenticate(req.body.password);
            if(isPassword){
                const token = jwt.sign({_id: user ._id, role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
                const {_id,firstName,lastName,email,role,username}=user;
                res.status(200).json({
                    success:true,
                    token,
                    data:user,
                    username:user.username,
                    role:user.role,
                    _id:user._id,
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName
                });
            }
            else{
                return res.status(400).json({
                    message: 'Invalid password'
                });
            }

        }else{
            return res.status(400).json({message:'Something went wrong'});        

        }
    });
};


exports.getAllUsers = (req,res)=>{
    User.find()
    .then(function(data){
        res.status(200).json({
            success:true,
            data:data
        });
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })
}

exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })

exports.getUserById=asyncHandler(async(req,res)=>{
    const user =await User.findById(req.params.id).select('-password')

    if(user){
        res.json(user)
    } else{
        res.status(404)
        throw new Error ('User not found')
    }
})

exports.updateUser=(req,res)=>{
    const userId=req.params.id;
    const firstName=req.body.firstName;
    const lastName= req.body.lastName;
    const username=req.body.username;
    const email = req.body.email;
   
    User.updateOne({_id:userId},{firstName:firstName,lastName:lastName,username:username,email:email})
    .then(function(result){
        res.status(200).json({
            message:"User updated successfully",
            success:true
        })
    })

    .catch(function(e){
        res.status(500).json({message:e,success:false})
        
    })
}


exports.deleteUserById=(req,res)=>{
    const userId =req.params.id;
    User.deleteOne({_id:userId})
    .then(function(result){
        res.status(201).json({message: "Product removed successfully"})
    })
    .catch(function(err){
        res.status(500).json({message:"Product not found"})
    });
}


exports.uploadUserImage=(req,res)=>{
    console.log(req.file.filename)
    const usrId= req.params.id
    if(req.file == undefined) return res.status(400).json({message: "jpeg and png images are only allowed"}); 
    User.updateOne({_id:usrId},{ pofilePicture : req.file.filename}).then(function(){
        res.status(200).json({success:true, message :"Profile picture successfully added"})
     }).catch(function(error){
        res.status(201).json({message :"User not found"})
        })
}


exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.firstName=req.body.firstName || user.firstName
      user.lastName=req.body.lastName || user.lastName
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: jwt.sign(updatedUser._id,process.env.JWT_SECRET,{expiresIn:'1h'}),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })


  exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        email: user.email,
        role: user.role,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
