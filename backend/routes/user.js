const { login, register, logout } = require('../controllers/user');
const auth = require('../middleware/auth');

const router = require('express').Router();

router.route("/login")
.post(login)
.get(auth,(req,res)=>{
    res.json({success : true , data : req.user , message : "User logged in"});
});

router.route("/register").post(register);

router.route("/logout").get(auth,logout);

module.exports = router;