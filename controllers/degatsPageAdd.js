//Post
const Post = require("../database/models/Conseq")

module.exports = async(req, res) => {

    const posts = await (await Post.find({}).limit(8)).reverse()
      
    //console.log(posts);
    
    res.render("degats", {posts})
}