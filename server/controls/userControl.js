const { signUpModel } = require('../model/userScheema')
const bcript = require('bcrypt')
const { jwtSign, jwtverify } = require('../helpers/jwt')

let userControl = {
    signUp: async (req, res) => {
        try {
            req.body.password = await bcript.hash(req.body.password, 10)
            signUpModel.create({
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                password: req.body.password,
            }).then((resp) => {
                console.log(resp);
                res.json('Account Created')
            }).catch(() => res.json('error'))
        } catch (e) {
            res.json('error')
        }
    },
    logIn: async (req, res) => {
        console.log(req.body);
        let data = await signUpModel.findOne({ email: req.body.userName })
        if (data !== null) {
            let pass = await bcript.compare(req.body.password, data.password)
            data.password = pass
            if (pass === false) {
                res.json(false)
            } else {

                res.cookie('jwt', jwtSign(data._id), { withCrdenttitals: true, httpOnly: false, secure: true, sameSite: "none", maxAge: 1000000 })
                    .json({ resp: true })
            }
        } else {
            res.json(false)
        }
    },
    checkAuth: async (req, res) => {
        try {
            const verify = jwtverify(req.cookies.jwt)
            let data = await signUpModel.findOne({ _id: verify.data })

            if (data != null) {
                data.password = true
                res.json({ login: true, data: data })
            } else {
                res.json({ login: false, data: null })
            }
        } catch (e) {

            res.json({ login: false, data: null })
        }
    },
    editpro: async (req, res) => {
        console.log(req.body);
        console.log(req.file);

        if (req.file == undefined) {
            req.file = {}
            req.file.filename = ''
        }
        if (req.body.userName == '') {
            let data = await signUpModel.findOne({ _id: req.body.id })
            if (data != null) {
                req.body.userName = data.fName
            } else {
                res.json('error')
            }
        }

        let data = await signUpModel.updateOne({ _id: req.body.id }, { $set: { image: req.file.filename, fName: req.body.userName } })
        if (data != null) {
            console.log(data);
            res.json('ok')
        } else {
            res.json('error')
        }
    },
    logOut: (req, res) => {
        res.cookie('jwt', '').json('logOut')
    }
}
module.exports = userControl