const { jwtSign } = require("../helpers/jwt");
const jwt = require('jsonwebtoken');
const { signUpModel } = require("../model/userScheema");


const admins = {
  adminlogin: function (req, res, next) {
    console.log(req.body);
    const username = 'admin'
    const password = 'password'
    if (req.body.userName === username && req.body.password === password) {
      let id = 123
      res.cookie('adminjwt', jwtSign(id), { withCrdenttitals: true, httpOnly: false, secure: true, sameSite: "none", maxAge: 1000000 })
        .json(true)
    } else {
      res.json(false)
    }
  },
  checkAuth: (req, res) => {
    try {
      let id = 123
      let verify = jwt.verify(req.cookies.adminjwt, 'secrect')
      console.log(verify);
      if (verify.data === id) {
        res.json({ login: true })
      } else {
        res.json({ login: false })
      }
    } catch (e) {
      res.json({ login: false })
    }
  }, logoutAdmin: (req, res) => {
    res.cookie('adminjwt', '').json('adminLogouted')
  },
  adminHome: async (req, res) => {
    console.log(req.query.search);
    let data = await signUpModel.find({ fName: new RegExp(req.query.search, 'i') }, { password: 0 }).lean()
    res.json(data)

  },
  deleteUser: async (req, res) => {
    console.log(req.params.id);
    await signUpModel.deleteOne({ _id: req.params.id })
    res.json('deleted')
  }, userEdit: async (req, res) => {
    let data = await signUpModel.findOne({ _id: req.params.id })
    if (data != null) {

      res.json({ fName: data.fName, email: data.email })
    } else {
      res.json(false)
    }
  }, postUserEdit: async (req, res) => {
    console.log(req.body.name.fName);
    let data = await signUpModel.findOne({ _id: req.params.id })
    if (req.body.name.email === '') {
      req.body.name.email = data.email
    }
    if (req.body.name.fName === '') {
      req.body.name.email = data.fName
    }
    if (req.file == undefined) {
      req.file = {}
      req.file.filename = data.image
    }
    let val = await signUpModel.updateOne({ _id: req.params.id }, { $set: { fName: req.body.name.fName, email: req.body.name.email, image: req.file.filename } })
    console.log(val);
    res.json(true)
  }
}
module.exports = admins