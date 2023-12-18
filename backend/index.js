const express = require('express');
const cors = require('cors');
const PORT = 8080 ;

const app = express(); 
app.use(cors());


app.get("/",(req, res)=>{
    res.json({message :"  welcome to amazon"});
})
app.listen(PORT,()=>{
    console.log("listening at "+PORT);
})