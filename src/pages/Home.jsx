import React, { useEffect, useRef } from "react";
import wallpaper from "../assets/wallpaper.jpeg";
import superhero from "../assets/superhero.mp3";

const Home = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {})
          .catch((error) => {
            console.error("Erreur lors de la lecture audio : ", error);
          });
      }
    };
    document.addEventListener("click", playAudio);
    return () => {
      document.removeEventListener("click", playAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <main>
      <img src={wallpaper} alt="Marvel" />
      <audio ref={audioRef} loop>
        <source src={superhero} type="audio/mp3" />
      </audio>
    </main>
  );
};

export default Home;
