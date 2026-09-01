    const imagekit = require("@imagekit/nodejs").default
    const { toFile } = require("@imagekit/nodejs")

    const client = new imagekit({
        privateKey:process.env.IMAGEKIT_PRIVATE_KEY
    })

    const uploadFile =async ({buffer,filename})=>{
    const file = await client.files.upload({
        file:await imagekit.toFile(Buffer.from(buffer),filename),
        fileName:filename,

        })
        return file
    }
    module.exports={uploadFile}