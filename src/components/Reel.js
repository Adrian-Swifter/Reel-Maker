import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Waveform from "../components/waveform/Waveform";
import PlayList from "../components/waveform/PlayList";
import useFirestore from "../hooks/useFirestore";

const dummyTracks = [
  {
    id: 0,
    title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
    url: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
  },
];

function Reel() {
  const location = useLocation();
  const allSongs = useFirestore("songs");
  const allReels = useFirestore("reels");
  const [selectedTrack, setSelectedTrack] = useState(dummyTracks[0]);
  //console.log(allSongs, allReels.songs[2].hash, location.hash);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [hash, setHash] = useState(0);

  useEffect(() => {
    let tempARr = [];
    let tempHash = [];
    allReels.songs.forEach((song, index) => {
      if (`#${song.hash}` === location.hash) {
        tempHash.push(index);
      }
      setHash(tempHash[0]);
    });

    allSongs.songs.forEach((song) => {
      if (allReels.songs[hash][0].includes(song.id)) {
        tempARr.push(song);
      }
      setFilteredSongs(tempARr);
    });
  }, [allReels.songs, hash]);

  console.log(hash, "hash");
  console.log(filteredSongs, "filtered");
  return (
    <div className="reel">
      <Waveform url={selectedTrack.url} />

      <PlayList
        tracks={filteredSongs}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
    </div>
  );
}

export default Reel;
