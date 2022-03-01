const mongoose= require('mongoose');

const reviewSchema = mongoose.Schema({
    username:{type:String},
    rating:{type:Number,required:true},
    comment:{type:String,required:true},

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    }
},
    {
        timestamps:true,
    }
)
const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    reviews:[reviewSchema],

    rating:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    },
   
    productPictures:{ 
        type: String 
    },
    

    category: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);