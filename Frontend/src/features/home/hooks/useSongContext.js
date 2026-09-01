import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSongApi } from "../services/song.api";


export const useSongContext = ()=>{
const context = useContext(SongContext)
const {loading,setLoading,song,setSong} = context

const handleGetSong =async ({mood})=>{
    setLoading(true)
    const data = await getSongApi({mood})
    setSong(data.song)
    setLoading(false)
}

return ({loading,song,handleGetSong})
}

