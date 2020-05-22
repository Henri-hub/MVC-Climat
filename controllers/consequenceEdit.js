
const Post = require("../database/models/Conseq")

module.exports = async (req, res) => {

   const conseq = await Post.findById({_id:req.params.id});
   
         
        if(req.session.userId) {
                
            return res.render("consequence/edit", {conseq})
      }

     res.redirect("/user/login")

}