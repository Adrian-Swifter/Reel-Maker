import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import Waveform from "../components/waveform/Waveform";
import PlayList from "../components/waveform/PlayList";
import useFirestore from "../hooks/useFirestore";

function Reel() {
  const location = useLocation();
  const allSongs = useFirestore("songs");
  const allReels = useFirestore("reels");

  const [selectedTrack, setSelectedTrack] = useState({ url: "initial value" });
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [hash, setHash] = useState(0);
  const downloadLink = useRef(null);

  const handleDownload = () => {
    
  }

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
      setSelectedTrack(tempARr[0]);
      setFilteredSongs(tempARr);
    });
  }, [allReels.songs, hash]);
  // const blob1 = new Blob([selectedTrack.url]);
  // downloadLink.current.href = URL.createObjectURL(blob1);
  // console.log(downloadLink, "aaaaaaa")
  return (
    <div className="reel">
      <Waveform
        url={selectedTrack.url}
        hash={location.hash}
        songName={selectedTrack.trackName}
      />

      <PlayList
        tracks={filteredSongs}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
      <button onClick={handleDownload}>Download Tracks</button>
    </div>
  );
}

export default Reel;
