var express = require('express');
var router = express.Router();
const {signUp, logIn,checkAuth, logOut, editpro}=require('../controls/userControl');
const upload = require('../helpers/multer');
/* GET home page. */
router.post('/signUp',signUp);
router.post('/logIn',logIn);
router.post('/editProfile',upload.single('image'),editpro)
router.get('/checkAuth',checkAuth)
router.get('/logout',logOut)
module.exports = router;
