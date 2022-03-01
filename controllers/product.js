const Product = require ('../models/productModel');
const  asyncHandler =require ('express-async-handler')


// exports.createProduct = (req,res)=>{
//     const { name, price, description, category, quantity, createdBy } = req.body;
//     let productPictures = []; 

//     if (req.files.length > 0) {
//         productPictures = req.files.map((file) => {
//           return { img: file.filename };
//         });
//       }

//       const product = new Product({
//         name: name,
//         slug: slugify(name),
//         price,
//         quantity,
//         description,
//         productPictures,
//         category,
//         createdBy: req.user._id,
//       });


//       product.save((error, product) => {
//         if (error) return res.status(400).json({ error });
//         if (product) {
//           res.status(201).json({ product, files: req.files });
//         }
//       });
//     };



//To display products in Web
exports.getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})



//To display products in mobile devices
  exports.showAllProducts = (req,res)=>{
    Product.find()
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

  exports.getProductById=(req,res)=>{
    const id = req.params.id;
    Product.findOne({_id:id})
    .then(function(data){
      res.status(200).json(data)
    })
    .catch(function(e){
      res.status(500).json({message:e})
    })
  }
  

  exports.deleteProductById = (req,res)=>{
    const productId=req.params.id;
    Product.deleteOne({_id:productId})
    .then(function(result){
        res.status(201).json({ message:"Product removed"});

    })
    .catch(function(err){
        res.status(500).json({message:"Product not found"})
    });
  }

  exports.createProductReview = asyncHandler(async(req,res)=>{
    const {rating,comment}= req.body
    const product= await Product.findById(req.params.id)

    if(product){
      const alreadyReviewed = product.reviews.find(
        (r)=> r.user.toString() === req.user._id.toString()
      )
      if (alreadyReviewed){
        res.status(400)
        throw new Error ('Product already reviewed')
      }

      const review={
        username: req.user.username,
        rating:Number(rating),
        comment,
        user:req.user._id
      }

      product.reviews.push(review)
      product.numReviews = product.reviews.length

      product.rating=
        product.reviews.reduce((acc,item)=>item.rating + acc,0) /
        product.reviews.length

        await product.save()
        res.status(201).json({message:'Review added'})
    }else{
      res.status(404)
      throw new Error('Product not found')
    }
  })


  