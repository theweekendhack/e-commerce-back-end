
const { v4: uuidv4 } = require('uuid');

/*const AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId :process.env.ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET
})
const s3 = new AWS.S3();*/

const userModel = require("../models/UserModel.js");
exports.getUserListing =(req,res)=>{


    userModel.find()  /*6000*/
    .then((users)=>{
        
        res.json({
            message : "A list of all the users in the database",
            data : users,
            total: users.length 
        })
      
    })
    .catch(err=>{

        res.status(500).json({
            message : `Error ${err}`,
        })  
    })
    


};


exports.addAUser=(req,res)=>{


    //The assign the JSON data from the body of the req to a variable call data
    const data = req.body;


    //This extracts the file type of the uploaded file
    const fileType =req.files.profilePic.mimetype;

    //This validates that the user uploaded an image
    if( fileType.includes("image") )
    {

            //Generates a unique ID
            const id = uuidv4(); 

            //Rename the name of the upload file to include the unique  ID
            const imageName =  `${id}_${req.files.profilePic.name}`;


            //This appends the name of the file to the req.body
            req.body.profilePic = imageName;


            //Get the Absolute path of the folder where the uplaoded file is going to be stored
           const path = `${process.cwd()}/assets/img/uploads/${imageName}`

            
              //upload the file
              req.files.profilePic.mv(path)
              .then(()=>{


                const newUser = new userModel(data);

                newUser.save() //this will trigger a promise
            
                .then((user)=>{ 
                   
                    res.json({
                        message: `The user was successfully created`,
                        data : user
                   
                    })
                })
               .catch(err=>{
            
                    res.status(500).json({
                        message : `Error ${err}`,
                    })  
                }) 

            })
            
        
    }

    //User did not upload an image
    else
    {
        res.status(400).json({
            message : `Sorry, you can only upload images!!!!!!!`,
        })  
    }

   
};



//GET /users/948
exports.getSingleUser = (req,res)=>{
   

    userModel.findById(req.params.id)
    .then((user)=>{
        

        if(user)
        {
            res.json({
                message : `User with the id ${user._id}`,
                data : user 
            })
        }

        else
        {
            res.status(404).json({
                message  :`No user found with id, ${req.params.id}`
            })
        }

    })
    .catch(err=>{

        res.status(500).json({
            message : `Error ${err}`,
        })  
    })

};




exports.updateAUser = (req,res)=>{


};


exports.deleteAUser = (req,res)=>{

    userModel.findByIdAndRemove(req.params.id)
    .then(user=>{


        if(user)
        {
            res.json({
                message :`User was deleted`
            })
        }

        else
        {
            res.status(404).json({
                message : `User with ID ${req.params.id} not found`
            })
        }

    })
    .catch(err=>{

        res.status(500).json({
            message : `Error  ${err}`
        })

    })



};


