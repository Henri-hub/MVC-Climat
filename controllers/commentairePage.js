//Post
const Post = require("../database/models/Conseq")

module.exports = async(req, res)=> {

    const posts = await Post.find({}).limit(4)

    res.render("commentaires", {posts})
}