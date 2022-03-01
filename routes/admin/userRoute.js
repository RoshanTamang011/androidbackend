const express= require('express');
const router = express.Router();
const { signup, login} = require('../../controllers/admin/auth');
const { validateSignUpRequest, isRequestValidated, validateLoginRequest } = require('../../validator/auth');

router.post ('/admin/login', validateLoginRequest, isRequestValidated, login);

router.post ('/admin/signup', validateSignUpRequest,isRequestValidated,signup);






// router.post('/user/register',
// [
//   check('UserName',"Username required").not().isEmpty(),
//   check('UserName',"It must be 6 letters long").isLength({min:6}),
//   check('Email', "Invalid email address").isEmail()
// ],

// function(req,res){
//   const errors= validationResult(req);
//   console.log(errors.array());
//   if(!errors.isEmpty()){
//     res.status(400).json(errors.array());
//   }
//   else{
//   const userName=req.body.UserName;
//   const email=req.body.Email;
//   const password=req.body.password;
//   const address=req.body.Address;
//   bcrypt.hash(password,10,function(err,hash){
//     //const user= new User(req.body);
//   const user=new User({UserName: userName, Email: email,password:hash,Address:address});

//   user.save()
//   .then(function(result){
//     //success insert
//     res.status(201).json({message:true})
//   })
//   .catch(function(e){
//     res.status(500).json({message: e})
//   });
    
//   })
 
//   }
// })








//Login
// router.get('/user/login',function(req,res){
//   const email=req.body.Email;
//   const password=req.body.password;
//   User.findOne({Email:email})
//   .then(function(userData){
//     if(userData===null){
//      return res.status(403).json({message:"Invalid login credentials"})
//     }
//     bcrypt.compare(password,userData.password,function(err,result){
//       if(result===false){
//         return res.status(403).json({message:"Invalid login credentials"})
//       }
//       //username and password valid
    
//       const token =jwt.sign({userId: userData._id},'secretkey');
//       res.status(200).json({
//         message:"Login success",
//         token:token
//       })

//     });

//   })
//   .catch()

// })

 module.exports= router;


