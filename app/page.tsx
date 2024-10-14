"use client";
import { FC, useEffect, useState } from "react";
import { FaMusic, FaPause, FaPlay } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

const music = [
  "music/arjun-vailay.mp3",
  "music/jale-2.mp3",
  "music/pehle-bhi-main.mp3",
  "music/ram-siya-ram.mp3",
];

const Home: FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
     console.log(audio?.currentTime);
    }, 1000);
  }, []);

  useEffect(() => {
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(music[currentSongIndex]);
    setAudio(newAudio);
    setIsPlaying(false);
  }, [currentSongIndex]);

  const playPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
    console.log(duration);
  };

  const skipNext = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === music.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(false);
  };

  const skipPrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? music.length - 1 : prevIndex - 1
    );
  };

  return (
    <main>
      <h2 className="text-3xl text-center mt-5 mb-12">Next Music</h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-[70%_30%] gap-5">
          <div className="current-music border p-5 rounded-md h-10/12">
            <div className="music-icon-wrapper flex justify-center items-center">
              <FaMusic size={200} />
            </div>
            <div className="playbar-area mt-40 flex flex-col items-center justify-between border p-3 gap-5 rounded-md">
              <h4 className="text-md font-semibold ">
                {music[currentSongIndex]}
              </h4>
              <div className="progress-bar h-1 relative rounded-md bg-gray-500 w-full after:absolute after:bg-red-500 after:top-0 after:left-0 after:w-5 after:h-full"></div>
              <div className="playbar-wrapper flex items-center justify-center gap-3">
                <button onClick={skipPrevious}>
                  <MdSkipPrevious size={25} />
                </button>
                <button onClick={playPause}>
                  {isPlaying ? <FaPause size={25} /> : <FaPlay size={25} />}
                </button>

                <button onClick={skipNext}>
                  <MdSkipNext size={25} />
                </button>
              </div>
            </div>
          </div>

          <div className="playlist border p-3 rounded-md">
            <h4 className="text-4xl text-center">
              {music &&
                music.map((musicItem, index) => (
                  <div
                    key={`${musicItem}-${index}`}
                    className={`song-item flex items-center justify-between border rounded-sm p-2 ${
                      currentSongIndex === index ? "bg-gray-100" : ""
                    } `}
                  >
                    <div className="music-logo-wrapper p-3 rounded-full border flex justify-center items-center">
                      <FaMusic size={15} />
                    </div>
                    <h6 className="playlist-song-title text-base">
                      {musicItem}
                    </h6>
                    <button
                      onClick={() => {
                        setCurrentSongIndex(index);
                      }}
                    >
                      <FaPlay size={15} />
                    </button>
                  </div>
                ))}
            </h4>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
