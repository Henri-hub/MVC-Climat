//Post
const Post = require("../database/models/Conseq")

module.exports = async(req, res) => {

    const posts = await Post.find({})
      
    //console.log(posts);
    console.log(req.session);
    

    res.render("index",{posts})
}