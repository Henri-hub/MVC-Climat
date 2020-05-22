
const User = require('../database/models/User')

module.exports = (req, res, next) => {

    // Connecte-toi dans la base de donnée
       User.findById(req.session.userId, (error, user) => {
           if(error || !user) {
               return res.redirect('/')
           }

           next()
       })   

    //Vérifier le user

    //S'il est dans la base de donée

    // Sinon tu le rediriges
}