const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const mySecret = process.env.JWT_SECRET_KEY;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // this should be done in env variable replace this .. it was just for testing purpose
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
});
const sendEmailWithRetry = (mailOptions,retryCount) =>{

  transporter.sendMail( mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      if (retryCount > 0) {
        console.log(`Retrying in 5 seconds (Attempt left${retryCount-1})...`);
        setTimeout(() => {
          sendEmailWithRetry(retryCount - 1);
        }, 5000);
      } else {
        console.log('Maximum retry attempts reached. Email could not be sent.');
        
      }
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

const sendVerificationEmail =  async (email , verificationToken) => {
  try {
    const url = process.env.NODE_ENV !== 'production' ? "http://localhost:8080" : "https://amazon-clone.onrender.com" ;
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Email verification',
      html: `<h1> Your account is successfully registered 🎉 </h1><p>Click the link to verify your email : <a href='${url}/api/v1/user/verify/email/${verificationToken}'> ${url}/api/v1/user/verify/email/${verificationToken} </a></p><p> Thank you</p>`,
    }

    sendEmailWithRetry(mailOptions,3);
    
  } catch (error) {
    console.error(error);
      }
  }



const register = asyncErrorHandler ( async (req, res) => {
      const { name, email, password } = req.body;
    if ( !name || !email || !password) {
      // return next(new customError("Please fill all details ",400));
      return res.status(400).json({status : false , message : "Please fill all details"});

    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      // return next(new customError("User already exist",409));
      return res.status(409).json({success : false , message : "User already exist"});

    }
    // if no account exists
    let user = await User.create({ ...req.body });
    
    // user.verificationToken =  user.getVerificationToken();
    await user.save();
    // sendVerificationEmail(email,user.verificationToken);
    user = await User.findById(user._id);
  
    // ------- setting up cookies ------
    const token =  jwt.sign(
      { _id: user._id, name: user.name },
      mySecret
      ,
      {expiresIn : "1day"}
    );
    res.cookie("jwt", token, {
      maxAge: 24*60*60*1000 ,
      httpOnly: true,
       sameSite: 'None',
      secure: process.env.NODE_ENV === 'production',
    });
    
    const {password : pwd,resetPasswordToken , resetPasswordExpiryTime,verificationToken,verificationTokenExpiryTime, verified, ...data} = user?._doc ;
    const expiryTime = parseInt(process.env.VERIFICATION_EXPIRY_TIME)/(60*1000);
    return res.json({ success: true, message : "Registered successfully " , data});
  } 
);

  const verifyEmail = async(req,res,next)=>{
    
    const token = req.params.token;
   const user =await User.findOne({verificationToken:token})
    if (!user) {
      return res.status(400).json({ success : false ,message: 'Invalid verification token' });
    }

    if(parseInt(Date.now() - (user.verificationTokenExpiryTime).getTime()) > 0 ) {
      return next(new CustomError("Verification token has expired" , 400));
    }
    user.verified = true;
    user.verificationToken=null;
    user.verificationTokenExpiryTime=null;
    await user.save();
    res.send('Email verified successfully Now you can login' );
}
// ----------login handler------------------

const login = asyncErrorHandler(async function (req, res,next) {

    const { email, password } = req.body;
   
  if (!email || !password) {
    // return next(new customError("Please fill valid email and password",400));
    return res.status(400).json({success : false , message : "Please fill valid email and password"}); 
  }
  let user = await User.findOne({ email }).select(["password"]);
  if (!user) {
    // return next(new customError("Invalid credentials",401));
    return res.status(401).json({success : false , message : "Invalid credentials"});
  }
  
  const isMatch = await user.matchPassword(password); 

  if(!isMatch)
  return res.status(401).json({success : false , message : "Invalid credentials"});
//   if(!user.verified)
//      {
//         //  return next(new ErrorHander("email is not verified",401));
//         return res.status(401).json({success:false , message : "Your email is not verified"});
//      }

    user = await User.findById(user._id);
    const token =  jwt.sign(
      { _id: user._id, name: user.name },
      mySecret
      ,
      {expiresIn : "1day"}
    );
    res.cookie("jwt", token, {
      maxAge: 24*60*60*1000 ,
      httpOnly: true,
       sameSite: 'None',
      secure: process.env.NODE_ENV === 'production',
    });
    const {password : pwd,resetPasswordToken , resetPasswordExpiryTime,verificationToken,verificationTokenExpiryTime, verified, ...data} = user?._doc ;
    
    res.status(200).json({ success: true, message: "Logged in successfully", data: {...data , jwt : token} });
  }
);
// ------ logout handler--------

const logout =  asyncErrorHandler(async (req, res) => {

    res.cookie("jwt", null, { maxAge: 0, httpOnly: true });
    return res.status(200).json({ success: true, message: "Logged out successfully"});
});


const getSingleuser = asyncErrorHandler( async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new CustomError("No user found ",404));
    }
    
    const {password : pwd,resetPasswordToken , resetPasswordExpiryTime,verificationToken,verificationTokenExpiryTime, verified, ...data} = user?._doc ;
    res.status(200).json({
      success: true,
      data 
        });
});

module.exports = {
  login,
  register,
  verifyEmail,
  logout,

  // verifyEmail,
};
