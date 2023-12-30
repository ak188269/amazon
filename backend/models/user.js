const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto=require("crypto");
const userSchema = new mongoose.Schema({
    name : String ,
    email :String ,
    password :String,
    number : String,
    cart : [
      {
        productId :   {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'product'
        },
        quantity : Number
      }
    ],
    verified :{
        type : Boolean,
        default : false
    },
    verificationToken : String,
    verificationTokenExpiryTime : Date,
    resetPasswordToken : {
        type : String ,
        default : ""
    },
    resetPasswordExpiryTime : Date ,
    googleToken : String
}
);
userSchema.pre("save",async function(next){
    if(this.password && this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
    }
    next();
})
userSchema.methods.matchPassword = async function (password){
    return  await bcrypt.compare(password.toString() , this.password.toString());
}
//generating email verification token
userSchema.methods.getVerificationToken = function (){
    const resetToken=  crypto.randomBytes(20).toString("hex")
    const expirationTime = new Date(Date.now() + parseInt(process.env.VERIFICATION_EXPIRY_TIME)); 
    this.verificationTokenExpiryTime = expirationTime;
    return resetToken;
}
//generating password reset token
userSchema.methods.getResetPasswordToken = function (){
    const resetToken=  crypto.randomBytes(20).toString("hex")
    const expirationTime = new Date(Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRY_TIME)); 
    this.resetPasswordExpiryTime = expirationTime;
    return resetToken;
}
module.exports = mongoose.model("user",userSchema);