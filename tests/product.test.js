const Product = require('../models/productModel')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/productTest';


beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
})

afterAll(async()=>{
    await mongoose.connection.close()
});


describe('Product schema test',()=>{
    it('Product insert  test',()=>{
        const product={
            'name':'Samsung',
            'price': 20000,
            'quantity' : 10,
            'description':'nice phone',
            'category':'smart phone'
        }

        return Product.create(product)
            .then((pro)=>{
                expect(pro.name).toEqual('Samsung')
            });
    })

    it('productDeleteTest',async()=>{
        const status= await Product.deleteMany();
        expect(status.ok).toBe(1)
    })
})