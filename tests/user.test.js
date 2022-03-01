const User = require('../models/userModel')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/userTest';


beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
})

afterAll(async()=>{
    await mongoose.connection.close()
});


describe('User schema test',()=>{
    it('Register user test',()=>{
        const user={
            'firstName':'Dipesh',
            'lastName':'Lama',
            'username' : 'DipeshLama',
            'email':'dipesh12@gmail.com',
            'password':'appleapple'
        }

        return User.create(user)
            .then((usr)=>{
                expect(usr.username).toEqual('DipeshLama')
            });
    })

    it('deleteUserTest',async()=>{
        const status= await User.deleteMany();
        expect(status.ok).toBe(1)
    })
})