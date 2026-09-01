const mongoose  = require("mongoose")

const blackListSchema  = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required"],


    }
},{timestamps:true})

const blackListModel = mongoose.model("blackListedTokens",blackListSchema)
module.exports  = blackListModel