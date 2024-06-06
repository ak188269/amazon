const asyncErrorHandler = require("../utils/asyncErrorHandler");
const User = require("../models/user");
const CustomError = require("../utils/customError");
const Product = require("../models/product");
const axios = require("axios")
//  -------- this is just a function used to get id of product in mongodb because al the product are copied from dumyjson.com and they had their own id
const getProductIdInMongodb = async (id)=>{

    const product = await Product.findOne({id : id});
    if(!product){
        const productDetails = await axios.get(`https://dummyjson.com/product/${id}`) ;
        if(!productDetails)
        throw new CustomError("Error: Couldn't find product",404);
    const productAddedToDatabase = await Product.create({
        ...productDetails.data
    })
    return productAddedToDatabase._id ;
    } 
    return product._id ;

};

// -------------- this will be used in adding new item as well as increasing the quantity of item if it exists already --------------
const addToCart = asyncErrorHandler(async (req ,res , next) => {
    //  default quantity is 1 
    const {quantity = 1} = req.body;
    const productId = await getProductIdInMongodb(req.body.productId);
    const userId = req.user._id ;
    const user = await User.findById(userId) ;
    if(!user){
        return next(new CustomError("User does not exist",404));
    }
    // ------- productId is converted to string otherwise they will not match ---------
    const productIndex = user.cart.findIndex((item)=> item.productId.toString() === productId.toString());
    if(productIndex !== -1){
        user.cart[productIndex].quantity += parseInt(quantity);
        await user.save();
        return res.json({success: true, message:"Item added successfully",data : {
            cartSize : user.cart.length
        }});
    }

    user.cart.unshift({productId , quantity});
    await user.save();
    return res.json({success: true, message:"Item added successfully",data : {
        cartSize : user.cart.length
    }});

})

//this will be used when user first time logins and there is product in cart saved  in local storage
const addToCartFromLocalstorage = asyncErrorHandler(async (req ,res , next) => {
    const {cart} = req.body ;

    const userId = req.user._id ;
    const user = await User.findById(userId) ;
    if(!user){
        return next(new CustomError("User does not exist",404));
    }
   
    cart.forEach(async (product)=>{
        const productId = getProductIdInMongodb(product.productId);
         // ------- productId is converted to string otherwise they will not match ---------
    const productIndex = user.cart.findIndex((item)=> item.productId.toString() === productId.toString());
    if(productIndex !== -1){
        user.cart[productIndex].quantity += parseInt(quantity);
        await user.save();
        return res.json({success: true, message:"Item added successfully"});
    }

    user.cart.unshift({productId, quantity});
    })
    await user.save();
    return res.json({success: true, message:"Items added successfully"});

})

// ------------------ decrease the quantity ------------------
const decreaseQuantityOfItem = asyncErrorHandler( async (req , res , next)=>{
    //  it is assumed that each time the quantity will be decreases by 1 
    
    const productId = await  getProductIdInMongodb(req.body.productId);
    const userId = req.user._id ;
    const user = await User.findById(userId);
    if(!user){
        return next(new CustomError("User does not exist",404));
    }
 // ------- productId is converted to string otherwise they will not match ---------
 const productIndex = user.cart.findIndex((item)=> item.productId.toString() === productId.toString());
    // ----- if product exist ------
    if(productIndex != -1){
        if(user.cart[productIndex].quantity > 1){
        user.cart[productIndex].quantity -= 1;
        await user.save();
        return res.json({success: true, message:"Item quantity decreased successfully"});
        }
        else if(user.cart[productIndex].quantity == 1){
           
           user.cart.splice(productIndex, 1);
           await user.save();
           return res.json({success: true, message:"Item removed successfully"});
        }
    }

    // -------- if there is no product then ------------------
    return next(new CustomError("No product found",404));

})

const deleteItemFromCart = asyncErrorHandler( async (req , res , next)=>{
    const productId = await  getProductIdInMongodb(req.params.productId);
    const userId = req.user._id ;
    const user = await User.findById(userId).populate('cart.productId') ;
    if(!user){
        return next(new CustomError("User does not exist",404));
    }
    const indexOfItem = user.cart.findIndex((item)=> item.productId._id.toString() === productId.toString());
    if(indexOfItem == -1){
        return next(new CustomError("Item not found",404));
    }
    user.cart.splice(indexOfItem, 1);
    await user.save();
    const subTotal = user.cart.reduce((accumulator ,item)=>{
        return   accumulator + item.quantity*item.productId.price*10 ;
      },0)
      const size = user.cart.reduce((accumulator ,item)=>{
          return   accumulator + item.quantity;
        },0)
    return res.json({success : true , message : "Item removed from cart" , data : {items :user.cart , size : size , subTotal : subTotal} });

});

const getCartSize  = asyncErrorHandler( async (req ,  res  , next)=>{
    const userId = req.user._id ;
    const user = await User.findById(userId) ;
    if(!user){
        return next(new CustomError("User does not exist",404));
    }
    // --------- in case of empty cart or undefined -----------
    if(!user.cart){
        return res.status(200).json({success : true , data : 0});
    }

    // ------- else if use cart is not undefined ------
    // const size = user.cart.reduce((accumulator ,item)=>{
    //   return   accumulator + item.quantity;
    // },0)
    const size = user.cart.length;
    res.status(200).json({success : true , data : size});

})
const getUserCart = asyncErrorHandler(async (req , res , next)=>{
    const userId = req.user._id ;
    const user = await User.findById(userId).populate('cart.productId') ;
    const subTotal = user.cart.reduce((accumulator ,item)=>{
      return   accumulator + item.quantity*item.productId.price*10 ; // price is multiplied by 10 alway this is followed everywhere as price mentioned in data was too less 
    },0)
    // const size = user.cart.reduce((accumulator ,item)=>{
    //     return   accumulator + item.quantity;
    //   },0)
    const size = user.cart.length;
    res.status(200).json({success : true , data : {items:user.cart , size : size ,subTotal:subTotal }});

})

module.exports = { addToCart , decreaseQuantityOfItem , getCartSize , getUserCart , deleteItemFromCart , addToCartFromLocalstorage}