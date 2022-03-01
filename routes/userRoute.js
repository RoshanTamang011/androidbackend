const express= require('express');
const { requireSignin, adminMiddleware, userMiddleware } = require('../common-middleware');
const router = express.Router();
const upload = require('../common-middleware/uploads');

const { signup, login, getAllUsers, getUsers, deleteUserById, updateUser, getUserById,uploadUserImage, updateUserProfile, getUserProfile} = require('../controllers/auth');
const { validateSignUpRequest, isRequestValidated ,validateLoginRequest} = require('../validator/auth');


router.post ('/login', validateLoginRequest, isRequestValidated, login);

router.post ('/signup',validateSignUpRequest,isRequestValidated,signup);

router.get('/users',requireSignin,adminMiddleware,getAllUsers);
router.get('/user',requireSignin,adminMiddleware,getUsers);

router.delete('/user/delete/:id',requireSignin,adminMiddleware,deleteUserById)

router.put('/user/edit/:id',updateUser)

router.get('/user/:id',requireSignin,adminMiddleware,getUserById)

router.put('/user/uploadImage/:id',requireSignin, upload.single('pofilePicture'),uploadUserImage)


router.put('/user/updateprofile',requireSignin,updateUserProfile)

router.get('/user/profile',requireSignin,getUserProfile)







 module.exports= router;


