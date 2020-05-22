//Post
const Post = require("../database/models/Conseq")

module.exports =  async(req, res) => {

    const conseq = await Post.findById(

        req.params.id
    )

    res.render("commentaires", {conseq})
}