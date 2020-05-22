const mongoose = require('mongoose')

const ConseqSchema = new mongoose.Schema({
     
    
    title : String, 
    content : String,
    image : String,
    author: String,
    createDate: {
        type : Date,
        default: new Date()
    },
    
})

const Conseq = mongoose.model('Conseq', ConseqSchema)

module.exports = Conseq 