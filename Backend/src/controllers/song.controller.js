const id3 = require("node-id3");
const uploadServices = require("../services/upload.service");
const songModel = require("../models/song.model");

const songPostController = async (req, res) => {
  //   const file = req.file;
  // console.log(req.file);
  const songBuffer = req.file.buffer;
  const { mood } = req.body;
  const fileDets = id3.read(songBuffer);
  console.log(fileDets);
  const songFiles = await uploadServices.uploadFile({
    buffer: req.file.buffer,
    filename: fileDets.title + ".mp3",
  });

  const songPoster = await uploadServices.uploadFile({
    buffer: fileDets.image.imageBuffer,
    filename: fileDets.title + ".jpeg",
  });

  const songs = await songModel.create({
    songUrl: songFiles.url,
    songPosterUrl: songPoster.url,
    title: fileDets.title,
    mood,
  });

  res.status(200).json({
    message:"song uploaded successfully",
    songs
  })
};

const getSong = async(req,res)=>{

    const {mood}= req.query

    const song = await songModel.findOne({
        mood
    })

    res.status(200).json({
        message:"Song fetched successfully",song
    })
}

module.exports = { songPostController,getSong };
