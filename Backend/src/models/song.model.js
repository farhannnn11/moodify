const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
    {
       songUrl:{
        type:String,
        // required:[true,"Song is required"]
       },
       songPosterUrl:{
        type:String,
        // default:""
        },
        title:{
            type:String,
            // default:"song title"
        },
        mood:{
            type:String,
            enum:{
                values:["sad","happy","surprised"]
            }
        }

    },);

const songModel = mongoose.model("songModel",songSchema)

module.exports = songModel