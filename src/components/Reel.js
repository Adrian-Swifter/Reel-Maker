import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import Waveform from "../components/waveform/Waveform";
import PlayList from "../components/waveform/PlayList";
import useFirestore from "../hooks/useFirestore";
import JsZip from "jszip";
import FileSaver from "file-saver";

function Reel() {
  const location = useLocation();
  const allSongs = useFirestore("songs");
  const allReels = useFirestore("reels");
  const [reelName, setReelName] = useState("")
  const [selectedTrack, setSelectedTrack] = useState({ url: "initial value" });
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [hash, setHash] = useState(0);
  const downloadLink = useRef(null);
  console.log(allReels)
  const download = async (img) => {
    const resp = await fetch(`https://cors-anywhere.herokuapp.com/${img}`);
    return await resp.blob();
  };

  const downloadByGroup = (urls, files_per_group = 5) => {
    return Promise.all(urls.map((url) => download(url)));
  };

  const exportZip = (blobs) => {
    const zip = JsZip();
    blobs.forEach((blob, i) => {
      zip.file(`file-${i}.mp3`, blob);
    });
    zip.generateAsync({ type: "blob" }).then((zipFile) => {
      const currentDate = new Date().getTime();
      const fileName = `combined-${currentDate}.zip`;
      return FileSaver.saveAs(zipFile, fileName);
    });
  };

  const downloadAndZip = async (urls) => {
    const blobs = await downloadByGroup(urls, 5);
    return exportZip(blobs);
  };

  const handleDownload = () => {
    const urls = filteredSongs.map((song) => song.url);
    downloadAndZip(urls);
  };

  useEffect(() => {
    let tempARr = [];
    let tempHash = [];
    allReels.songs.forEach((song, index) => {
      if (`#${song.hash}` === location.hash) {
        tempHash.push(index);
      }
      setHash(tempHash[0]);
      setReelName(song.reelName)
    });

    allSongs.songs.forEach((song) => {
      if (allReels.songs[hash][0].includes(song.id)) {
        tempARr.push(song);
      }
      setSelectedTrack(tempARr[0]);
      setFilteredSongs(tempARr);
    });
  }, [allReels.songs, hash]);

  return (
    <div className="reel">
      <Waveform
        url={selectedTrack.url}
        hash={location.hash}
        songName={selectedTrack.trackName}
        reelName={reelName}
      />

      <PlayList
        tracks={filteredSongs}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
      <button onClick={() => handleDownload()}>Download Tracks</button>
    </div>
  );
}

export default Reel;
