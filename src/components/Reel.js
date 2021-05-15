import React, { useState, useEffect } from "react";
import Waveform from "../components/waveform/Waveform";
import PlayList from "../components/waveform/PlayList";
import useFirestore from "../hooks/useFirestore";

const tracks1 = [
  {
    id: 0,
    title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
    url:
      "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
  },
  {
    id: 1,
    title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
    url:
      "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
  },
];

function Maker() {
  const tracks = useFirestore("songs");
  const [selectedTrack, setSelectedTrack] = useState(tracks1[0]);
  
  return (
    <div className="maker">
      <Waveform url={selectedTrack.url} />
      <PlayList
        tracks={tracks.songs}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
    </div>
  );
}

export default Maker;
