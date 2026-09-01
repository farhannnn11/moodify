const app = require("./src/app")
const connetToDB = require("./src/config/database")
connetToDB()
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})