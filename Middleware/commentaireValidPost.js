module.exports = (req, res, next) => {
    
   if(!req.files) {
       return res.redirect("/commentaires")
   }
   console.log("Je suis le Middleware");

   next()
}