
module.exports = (req, res) =>{
    
    if(req.session.userId) {

        return res.render('consequence/add')
    }
    res.redirect("/user/login") 
}