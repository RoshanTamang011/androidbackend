const User = require ("../../models/userModel");
const jwt = require("jsonwebtoken");

//-------------------------------REGISTER-------------------------------------
exports.signup = (req,res) => {
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message: 'Admin already registered'
        });

        const {
            firstName,
            lastName,
            username,
            email,
            password
        }=req.body;
        
        const _user = new User ({firstName,lastName,email,password,username,role:'admin'});

        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }

            if(data){
                return res.status(201).json({
                    message:"Admin registered successfully"
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
            const isPassword= await user.authenticate(req.body.password)
            if(isPassword && user.role==='admin'){
                const token = jwt.sign({_id: user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
                const {_id,firstName,lastName,email,role,fullName}=user;
                res.status(200).json({
                    success:true,
                    token,
                    user:{  
                        _id,firstName,lastName,email,role,fullName
                    }
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


