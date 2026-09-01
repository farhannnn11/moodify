const userModel = require("../models/user.model")
const bcryptjs = require("bcryptjs") 
const jwt = require("jsonwebtoken")
const blackListModel = require("../models/blackList.model")


const registerController = async (req,res)=>{

    const {username,email,password,bio,profilePic} = req.body

    const emailExists = await userModel.findOne({email:email})
    const usernameExists = await userModel.findOne({username:username})

    if(emailExists || usernameExists){
        return res.status(409).json({
            message:emailExists?"email already exists":"username already exists"
        })
    }
    const hash  = await bcryptjs.hash(password,10)
    const userData  = await userModel.create({
        username,email,password:hash ,bio,profilePic
    })
    
    const token = jwt.sign({
        username : userData.username,
        userId: userData._id
        
    },process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
    
    res.cookie("token",token)
    res.status(200).json(({
        message:"User registered Successfully",userData,token
    }))
}

const loginController =  async(req,res) =>{
    const {username,email,password} =  req.body
    const userExists = await userModel.findOne({$or:[{username:username},{email:email}]}).select("+password")

    if(!userExists){
        return res.status(404).json({
            message:"Invalid Credentials"
        })
    }
    const isMatched = await bcryptjs.compare(password,userExists.password)

    if(!isMatched){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    }

        const token = jwt.sign({
        username:userExists.username,
        userId:userExists._id
    },process.env.JWT_SECRET_KEY)

    res.cookie("token",token)
    
    res.status(200).json({
        message:"User logged in Successfully",userExists
    })
}

const getMeControler = async  (req,res)=>{
    const userId = req.user.userId
    const userExists  = await userModel.findById(userId)
    res.status(200).json({
        message:"User fetched Successfully",userId,userExists
    })
}

const logoutController =  async(req,res)=>{
    const token = req.cookies.token
   
    res.clearCookie('token')    
   await blackListModel.create({
        token
    })

    res.status(201).json({
        message:"user logout successfully"
    })
}

module.exports = {registerController,loginController,getMeControler,logoutController}