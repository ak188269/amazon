require("dotenv").config({path:"./.env"})
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./database/database");
const { default: axios } = require("axios");
const Product = require("./models/product");
const globalErrorHandler = require("./controllers/globalErrorHandler");

const PORT = process.env.PORT || 8080 ;

const app = express(); 
app.use(cors({origin : [ 'http://localhost:3000','https://amazon-shopping-website.vercel.app'] , credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended: true , limit:"20mb"}));
app.use(cookieParser());
connectToDatabase();
app.get("/",(req, res)=>{
    res.json({message :"  welcome to amazon"});
})
app.use("/api/v1/user",require("./routes/user"));
app.use("/api/v1/cart",require("./routes/cart"));
app.listen(PORT,()=>{
    console.log("listening at "+PORT);
})

app.use(globalErrorHandler);
