const jwt = require("jsonwebtoken");
const blackListModel = require("../models/blackList.model");

const identifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      message:"Invalid token"
    })
  }

const isBlackListed = await blackListModel.findOne({token})

if(isBlackListed){
  return res.status(401).json({
    message:"Invalid Token"
  })
}

res.status(200).json({
  message:"user logged in Successfully"
})

  try{
  const isVerfied = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = isVerfied
  next()
  }catch(err){
    return res.status(403).json({
        message:"Invalid token"
    })  }
};



module.exports = {identifyUser}
