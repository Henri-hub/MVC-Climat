
module.exports = (req, res, next) => {
    
    if(!req.files) {
       return res.redirect("/degats")
   }
   console.log("Je suis le Middleware");

   next()
}