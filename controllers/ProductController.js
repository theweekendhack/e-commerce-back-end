const express = require('express')
const  router = express.Router()

const productService = require("../services/ProductService.js");

//GIVES ME ALL THE USERS
router.get('/', productService.getAllProducts )


//GIVES ME A USER
router.get('/:id',productService.getAProduct)


//CREATES A USER
router.post('/', productService.createAProduct)


//UPDATES A USER
router.put('/:id', productService.updateAProduct)


//DELETES A USER
router.delete('/:id',productService.deleteAProduct)

module.exports = router;