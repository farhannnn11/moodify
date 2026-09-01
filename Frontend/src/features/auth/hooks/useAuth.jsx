import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {registerApi,loginApi,logoutApi,getMeApi} from "../services/auth.api"

export  const useAuth =()=>{
    const context = useContext(AuthContext);
    const {user,setUser,loading,setLoading} = context

const handlerRegister =async ({username,email,password})=>{
        setLoading(true)
        const data = await registerApi({username,email,password})
        setUser(data.user)
        setLoading(false)
        console.log();
        
    }

 const handleLogin  =async ({email,password})=>{
    setLoading(true)
    const data =  await loginApi({email,password})
    setUser(data.user)
    setLoading(false)
 }

 const handlegetMe = async()=>{
    setLoading(true)
  const data =   await getMeApi()
  setUser(data)
  setLoading(false)

}

const handlelogout = async()=>{
    setLoading(true)
    const data = await logoutApi()
    setUser(data.user) 
    setLoading(false) 

}

return(
    {user,loading,  handlerRegister,handleLogin,handlegetMe,handlelogout}
)

}  
