const express = require('express')
const router = express.Router();

const userService = require("../services/UserService.js");

router.get("/",userService.getUserListing);

router.get("/:id",userService.getSingleUser);

router.post("/", userService.addAUser);

router.delete("/:id",userService.deleteAUser);

module.exports=router;


