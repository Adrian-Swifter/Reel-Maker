import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Waveform from "../components/waveform/Waveform";
import PlayList from "../components/waveform/PlayList";

const dummyTracks = [
  {
    id: 0,
    title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
    url: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
  },
];

function Reel() {
  const location = useLocation();
  const [selectedTrack, setSelectedTrack] = useState(dummyTracks[0]);
  useEffect(() => {
    setSelectedTrack(location.songs[0]);
  }, [location]);

  console.log();
  return (
    <div className="reel">
      <Waveform url={selectedTrack.url} />
      <PlayList
        tracks={location.songs}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
    </div>
  );
}

export default Reel;
