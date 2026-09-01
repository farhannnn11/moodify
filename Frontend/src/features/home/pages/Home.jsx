import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import { useSongContext } from "../hooks/useSongContext";
const Home = () => {
  const { handleGetSong } = useSongContext();

  return (
    <div>
      <FaceExpression
        onClick={(expression) => {
          handleGetSong({ mood: expression });
        }}
      />
      <Player />
    </div>
  );
};

export default Home;
