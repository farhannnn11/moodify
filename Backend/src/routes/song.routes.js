const express = require("express")
const upload = require("../middlewares/upload.middleware")
const songController = require("../controllers/song.controller")
const songRouter  = express.Router()

songRouter.post("/",upload.single("song"),songController.songPostController)
songRouter.get("/",songController.getSong)

module.exports = songRouter