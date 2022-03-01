const express= require('express');
const { deleteProductById, showAllProducts, getProducts,getProductById, createProductReview } = require('../controllers/product');
const router= express.Router();
const Product= require('../models/productModel');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const upload = require('../common-middleware/uploads');
const slugify  = require('slugify');


router.post('/product/create',requireSignin,adminMiddleware,
    upload.single('productPictures'),function(req,res){
        if(req.file==undefined){
            return res.status(400).json({
                message:"Invalid image format"
            })
        }
        const name=req.body.name;
        const price=req.body.price;
        const quantity=req.body.quantity;
        const description=req.body.description;
        const category=req.body.category;
        const createdBy=req.body;

        const product=new Product({
            name:name,
            slug:slugify(name),
            price:price,
            quantity:quantity,
            description:description,
            numReviews:0,
            productPictures:req.file.filename,
            category:category,
            createdBy:req.user._id
            
        })
        product.save()
        .then(function(result){
      res.status(200).json({message:"Product added",product})
    })
    .catch(function(err){
    res.status(500).json({message:err,product})
    });
        
    })



router.get('/product/showAll',showAllProducts);


router.get('/products',getProducts)


router.get('/product/:id',getProductById);

router.put('/product/update/:id',requireSignin, adminMiddleware, upload.single('productPictures'),function(req,res){
        const productId = req.params.id;
        const name=req.body.name;
        const slug=slugify(name);
        const price=req.body.price;
        const quantity=req.body.quantity;
        const description=req.body.description;
        const category=req.body.category;
        const createdBy=req.user._id

        Product.updateOne({_id:productId},{name:name,slug:slug,price:price,quantity:quantity,description:description,category:category,createdBy:req.user._id,productPictures:req.file.filename})
        .then(function(result){
          res.status(200).json({
            message:" Product Updated successfully"
            })
        })
        .catch(function(e){
          res.status(500).json({message:e})
        })
})


router.post('/product/:id/reviews',requireSignin,createProductReview)
router.delete('/product/delete/:id', requireSignin,adminMiddleware,deleteProductById);


module.exports=router;
 
