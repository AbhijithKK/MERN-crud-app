var express = require('express');

var router = express.Router();
const {adminlogin, checkAuth, logoutAdmin, adminHome, deleteUser, userEdit, postUserEdit}=require('../controls/adminControl');
const upload = require('../helpers/multer');

/* GET users listing. */
router.post('/login',adminlogin );
router.get('/checkAuth',checkAuth)
router.get('/logout',logoutAdmin)
router.get('/home',adminHome)
router.get('/delete/:id',deleteUser)
router.get('/userProfile/:id',userEdit)
router.post('/userProfile/:id',upload.single('image'),postUserEdit)
module.exports = router;
