import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { app, timestamp } from "../../firebase/firebase_storage";
import firebase from "firebase/app";
const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "gray",
  progressColor: "#333",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

export default function Waveform({ url, hash, songName }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    console.log(url);
    wavesurfer.current.load(url);
    wavesurfer.current.on("loading", function (X) {
      UpdateLoadingFlag(X);
    });
    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      //wavesurfer.current.play();
      //setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);

        const eventNameandIcon = {
          name: "Open",
          icon: "visibility",
        };
        const time = new Date().toLocaleString() + "";

        const eventData = {
          eventNameandIcon,
          songName,
          time,
        };

        app
          .firestore()
          .collection("events")
          .doc(hash)
          .set(
            {
              eventInfo: firebase.firestore.FieldValue.arrayUnion(eventData),
            },
            { merge: true }
          );
      }
    });

    wavesurfer.current.on("seek", function (position) {
      const timeseek = position * wavesurfer.current.getDuration();
      const createdAt = timestamp();
      const eventNameandIcon = {
        name: "seek",
        icon: "swap_horiz",
      };
      const seekTo = convertSecToMin(timeseek);
      const color = "gold";
      const time = new Date().toLocaleString() + "";
      const eventData = {
        eventNameandIcon,
        songName,
        seekTo,
        color,
        time,
      };

      app
        .firestore()
        .collection("events")
        .doc(hash)
        .set(
          {
            eventInfo: firebase.firestore.FieldValue.arrayUnion(eventData),
            createdAt,
          },
          { merge: true }
        );
    });

    wavesurfer.current.on("pause", function (position) {
      const createdAt = timestamp();
      const eventNameandIcon = {
        name: "pause",
        icon: "pause",
      };

      const color = "tomato";
      const time = new Date().toLocaleString() + "";
      const eventData = {
        eventNameandIcon,
        songName,
        color,
        time,
      };

      app
        .firestore()
        .collection("events")
        .doc(hash)
        .set(
          {
            eventInfo: firebase.firestore.FieldValue.arrayUnion(eventData),
            createdAt,
          },
          { merge: true }
        );
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  /* utiluty functions */

  const UpdateLoadingFlag = (Percentage) => {
    if (document.getElementById("loading_flag")) {
      document.getElementById("loading_flag").innerText =
        "Loading " + Percentage + "%";
      if (Percentage >= 100) {
        document.getElementById("loading_flag").style.display = "none";
      } else {
        document.getElementById("loading_flag").style.display = "block";
      }
    }
  };

  const convertSecToMin = (timestamp) => {
    const hours = Math.floor(timestamp / 60 / 60);

    const minutes = Math.floor(timestamp / 60) - hours * 60;

    const seconds = Math.round(timestamp % 60);

    const formatted = `${hours}:${minutes}:${seconds}`;

    return formatted;
  };

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div>
      <div id="loading_flag"></div>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <button className="playBtnWF" onClick={handlePlayPause}>
          {!playing ? "Play" : "Pause"}
        </button>
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}
        />
        <label htmlFor="volume">Volume</label>
      </div>
    </div>
  );
}
