import axios from "axios";

const api = axios.create({
    baseURL:"https://moodify-ae8i.onrender.com",
    withCredentials:true
})

export const getSongApi =async ({mood})=>{
    const response = await api.get(`/api/songs?mood=${mood}`)
    console.log(response.data);
    
    return response.data
    
}       