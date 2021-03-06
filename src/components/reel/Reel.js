import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Waveform from "../waveform/Waveform";
import PlayList from "../waveform/PlayList";
import useFirestore from "../../hooks/useFirestore";
import JsZip from "jszip";
import FileSaver from "file-saver";
import NotFound from "../NotFound";
import NavigationMenu from "./NavigationMenu";
import About from "./About";
import Projects from "./Projects";
import Button from "../Button";

function Reel() {
  const location = useLocation();
  const allSongs = useFirestore("songs");
  const allReels = useFirestore("reels");
  const [reelName, setReelName] = useState("");
  const [selectedTrack, setSelectedTrack] = useState({ url: "initial value" });
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [hash, setHash] = useState(0);
  const [isTheHashOk, setIsTheHashOk] = useState(false);
  let hashes = [];

  const download = async (audioUrl) => {
    const resp = await fetch(audioUrl);
    return await resp.blob();
  };

  const downloadByGroup = (urls) => {
    return Promise.all(urls.map((url) => download(url)));
  };

  const exportZip = (blobs, trackNames) => {
    const zip = JsZip();
    blobs.forEach((blob, i) => {
      zip.file(trackNames[i], blob);
    });
    zip.generateAsync({ type: "blob" }).then((zipFile) => {
      const currentDate = new Date().getTime();
      const fileName = `JohnPaesanoReel-${currentDate}.zip`;
      return FileSaver.saveAs(zipFile, fileName);
    });
  };

  const downloadAndZip = async (urls, trackNames) => {
    const blobs = await downloadByGroup(urls);
    return exportZip(blobs, trackNames);
  };

  const handleDownload = () => {
    const urls = filteredSongs.map((song) => song.url);
    const trackNames = filteredSongs.map((song) => song.trackName);
    downloadAndZip(urls, trackNames);
  };

  useEffect(() => {
    let tempARr = [];
    let tempHash = [];

    allReels.songs.forEach((reel, index) => {
      if (
        reel.hash.includes(
          location.hash
            .split("")
            .filter((i) => i !== "#")
            .join("")
        )
      ) {
        tempHash.push(index);
        hashes = [...reel.hash];
      }
      hashes.push(reel.hash);
      //we are setting index of the reel here, not hash
      setHash(tempHash[0]);
    });

    hashes.includes(
      location.hash
        .split("")
        .filter((i) => i !== "#")
        .join("")
    )
      ? setIsTheHashOk(true)
      : setIsTheHashOk(false);
    isTheHashOk &&
      allSongs.songs.forEach((song) => {
        if (allReels.songs[hash][0].includes(song.id)) {
          tempARr.push(song);
        }
        setReelName(allReels.songs[hash].reelName);
        setSelectedTrack(tempARr[0]);
        setFilteredSongs(tempARr);
      });
  }, [allReels.songs, hash, location.hash, isTheHashOk]);

  return (
    <div className="reel">
      {isTheHashOk === false ? (
        <NotFound />
      ) : (
        <>
          <NavigationMenu />
          <div className="about__wrapper">
            <div className="playlist__wrapper">
              <Waveform
                url={selectedTrack.url}
                hash={location.hash}
                songName={selectedTrack && selectedTrack.trackName}
                reelName={reelName}
              />

              <PlayList
                tracks={filteredSongs}
                selectedTrack={selectedTrack}
                setSelectedTrack={setSelectedTrack}
              />
              <Button
                buttonName="Download All Tracks"
                buttonIcon="download"
                onClick={() => handleDownload()}
              />
            </div>
            <About />
          </div>
          <Projects />
        </>
      )}
    </div>
  );
}

export default Reel;
