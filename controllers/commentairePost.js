  //Path
  const path = require('path')
  //Post
  const Post = require("../database/models/Conseq")
  
  module.exports = (req,res) => {
  
     // const {image} = req.files
  
     // const uploadFile = path.resolve(__dirname, '..','public/mesimages', image.name);
      
      //image.mv(uploadFile, (error) => {
         
          Post.create(
              {
                  ...req.body,
                  //image : `/mesimages/${image.name}`
              }
              
              ,(error, post)=> {
  
              res.redirect("/commentaires")
           })
      }
  
  