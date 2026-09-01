import axios from "axios"
const api = axios.create({
    baseURL:"https://moodify-ae8i.onrender.com/api/auth",
    withCredentials:true
})


export const registerApi = async ({email,username,password})=>{
    const response = await api.post("/register",{
        email,username,password
    })

    return response.data
}

export const loginApi =async ({email,password})=>{
   const response = await api.post("/login",{
        email,password
    })

    return response.data
}

export const getMeApi = async()=>{
    const response = await api.get("/get-me")
    return response.data
}

export const logoutApi = async ()=>{
    const response = await api.get("/logout")
    return response.data
}