const mongoose =require("mongoose");

const signUp=mongoose.Schema({
    fName:String,
    lName:String,
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:String

})
const signUpModel=mongoose.model('userData',signUp)
module.exports={signUpModel}
