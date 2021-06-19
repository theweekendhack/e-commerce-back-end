const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({

    title : {
        type:String,
        required: true
    },

    description : {

        type:String,
        required: false
    },

    unitPrice : {
        type:Number,
        required: true
    },

    qty : {

        type:Number,
        required: true
    },

    category : {
        type:String,
        required: true
    },

    costPrice : {

        type: Number,
        required: true
    },
    imgPath : {

        type:String,
        default : "default.jpg"
    },

    dateCreated:
    {
        type:Date,
        default:Date.now()
    },

    isBestseller : 
    {
        type:Boolean,
        default : false
    }

});


const productModel  = mongoose.model("product",productSchema);

module.exports = productModel;