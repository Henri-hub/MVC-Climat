//Post
const Post = require("../database/models/Conseq")

module.exports = async (req, res) => {

   const conseq = await Post.findById({_id:req.params.id})

    conseq.deleteOne ({_id:req.params.id}, function(error) {
        
        if(!error){
            res.redirect("/commentaires")
        }else{
            res.send("error")
        }
    })
}