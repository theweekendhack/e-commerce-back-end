
const { v4: uuidv4 } = require('uuid');
const productModel = require("../models/ProductModel.js");

exports.getAllProducts = (req,res)=>{


    //show me all products (BY a specific category ) ( /users?cat=Smart Phones)
    if(req.query.cat)
    {
        productModel.find({category : req.query.cat}) 
        .then(products=>{
    
            res.json({
                message : `List all the Products by  ${req.query.cat}`,
                data : products,
                total: products.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        })   

    }

    //show me all products (BY bestseller ) ( /users?bestseller=y)
    else if(req.query.bestseller)
    {
       
        let search;
        const value = req.query.bestseller;

        if(value === 'y')
        {
            search = true
        }

        else
        {
            search = false
        }
        console.log(search)
        

        productModel.find({isBestseller : search})  
        .then(products=>{
    
            res.json({
                message : `List of all Products`,
                data : products,
                total: products.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        })   
    }

    //show me all PRODUCT (NO FILTER ) -no query string ( /users/)
    else
    {
        productModel.find()
        .then(products=>{
    
            res.json({
                message : `List of all Products`,
                data : products,
                total: products.length
            })
        })
        .catch(err=>{
    
            res.status(500).json({
                message : `Error  ${err}`
            })
    
        })   
    }


 
  
  
    
};


exports.getAProduct = (req,res)=>{


    productModel.findById(req.params.id) 
    .then(product=>{

        //A product was found based on the id given
        if(product)
        {

            res.json({
                message : `Product with ${req.params.id}`,
                data : product
            })

        }

        //product was not found based on the id given BUT the id provided ahered to the Object format of MongoDB
        else
        {
            res.stauts(404).json({
                message : `Product with ID : ${req.params.id} not found`,
            })

        }
    })
    .catch(err=>{

        res.status(500).json({
            message : `Error  ${err}`
        })

    })

};


exports.createAProduct = (req,res)=>{

    //temp code
    const newProduct = req.body;

    const product = new productModel(newProduct);

    product.save()
    .then(product=>{

        res.json({
            message : `THe product was successfully created`,
            data : product
        })

    })
    .catch(err=>{

        res.status(500).json({
            message : `Error  ${err}`
        })

    })


     //The assign the JSON data from the body of the req to a variable call data
    /* const newProduct = req.body;

 

     
     //This extracts the file type of the uploaded file
     const fileType =req.files.imgPath.mimetype;
 
     //This validates that the user uploaded an image
     if( fileType.includes("image") )
     {
 
             //Generates a unique ID
             const id = uuidv4(); 
 
             //Rename the name of the upload file to include the unique  ID
            const imageName =  `${id}_${req.files.imgPath.name}`;


            //Get the Absolute path of the folder where the uplaoded file is going to be stored
            const path = `${process.cwd()}/assets/img/uploads/${imageName}`;

            newProduct.imgPath =imageName;

               //upload the file
               req.files.imgPath.mv(path)
               .then(()=>{

                const product = new productModel(newProduct);

                    product.save()
                    .then(product=>{
                
                        res.json({
                            message : `THe product was successfully created`,
                            data : product
                        })
                
                    })
                    .catch(err=>{
                
                        res.status(500).json({
                            message : `Error  ${err}`
                        })
                
                    })

               })
               .catch(err=>{

                res.status(500).json({
                    message : `Error ${err}`,
                })  
            })
   
               


     }

    
     //User did not upload an image
    else
    {
        res.status(400).json({
            message : `Sorry, you can only upload images!!!!!!!`,
        })  
    } */
    



};

exports.updateAProduct = (req,res)=>{


    const updatedDate = req.body;


    //validation


    productModel.findByIdAndUpdate(req.params.id,updatedDate,{new:true})
    .then(product=>{

        //product not null. ID found
        if(product)
        {

            res.json({
                message : `Product with id (${req.params.id}) was updated successfully `,
                data : product
            })

        }
        //product was null because the id was not found
        else
        {
            res.stauts(404).json({
                message : `Product with ID : ${req.params.id} not found`,
            })
        }

    })
    .catch(err=>{

        res.status(500).json({
            message : `Error  ${err}`
        })

    })


}

exports.deleteAProduct = (req,res)=>{

    productModel.findByIdAndRemove(req.params.id)
    .then(product=>{

        console.log(product)
        if(product)
        {
            res.json({
                message :`Product was deleted`
            })
        }

        else
        {
            res.status(404).json({
                message : `Product with ID ${req.params.id} not found`
            })
        }

    })
    .catch(err=>{

        res.status(500).json({
            message : `Error  ${err}`
        })

    })
}