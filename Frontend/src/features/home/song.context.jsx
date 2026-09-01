import { createContext, useState } from "react";

export const SongContext = createContext()


export const SongContextProvider = ({children}) =>{

    const [song, setSong] = useState({
    "songUrl": "https://ik.imagekit.io/xa7izbu97/Jatt_Mehkma__RiskyjaTT.CoM__1RCuWsVia.mp3",
    "songPosterUrl": "https://ik.imagekit.io/xa7izbu97/Jatt_Mehkma__RiskyjaTT.CoM__VwlMe3eb42.jpeg",
    "title": "Jatt Mehkma (RiskyjaTT.CoM)",
    "mood": "happy",
  })

    const [loading, setLoading] = useState(false)

    return(
    <SongContext.Provider value={{loading,setLoading,song,setSong}}>
        {children}
    </SongContext.Provider>
    )
    
}