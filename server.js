const express = require("express");
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require("cors");


if(process.env.NODE_ENV!="production")
{
    require('dotenv').config({path:"config/Keys.env"});
}

const productController = require("./controllers/ProductController.js")
const userController = require("./controllers/UserController.js");

const app = express();

//This middleware allows your API to parse incoming JSON data
app.use(express.json());


///This middleware  allows your API to parse incoming multipart/form-data (Data that contains both text and file(s))
app.use(fileUpload());


app.use(cors({
    orgin: process.env.FRONT_END_HOST_ADDRESS    
}));

app.use(express.static('assets'))

app.use("/products",productController);
app.use("/users",userController);

const PORT = process.env.PORT;

app.listen(PORT,()=>{

    console.log(`Web Server is up and running on ${PORT}`)

    mongoose.connect(`${process.env.MONGO_DB_CONNECTION}`, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
    .then(()=>{

        console.log(`Connencted to the MongoDB`)
    })
    .catch(err=>{
        console.log(`Error happend : $${err}`)
    })

})