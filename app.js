const express=require('express');
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const path =require("path");
const fileupload = require('express-fileupload');
const bodyParser=require('body-parser');
const colors=require('colors');
const cors=require('cors')
const app=express();

dotenv.config({
    path: "./config/config.env"
});



//connect to mongoDb database
connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:true}));

//--------------------------User route-------------------------------------
const userRoutes=require('./routes/userRoute');
app.use('/api',userRoutes);

//---------------------------Admin routes-------------------------
const adminRoutes=require('./routes/admin/userRoute');
app.use('/api',adminRoutes);

//---------------------------Product routes-------------------
const productRoutes=require ('./routes/productRoute');
app.use('/api',productRoutes);

//---------------------------Cart routes-----------------------
const cartRoutes=require('./routes/cartRoute');
app.use('/api',cartRoutes);

//----------------------------Wish routes-----------------------
const wishRoutes=require('./routes/wishRoute');
app.use('/api',wishRoutes);

//-----------------------------Order routes----------------
const orderRoutes=require('./routes/orderRoute');
app.use('/api',orderRoutes)



app.get('/',(req,res)=>{
    res.send('API is running')
})



app.use(fileupload());

app.use(express.static(path.join(__dirname, "/uploads")));



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(
    `Server running in mode : ${process.env.NODE_ENV},on port : ${PORT}`.yellow.bold)
      )