import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { app, timestamp } from "../../firebase/firebase_storage";
import firebase from "firebase/app";
import ConvertCecToMin from "../../components/utils/ConvertCecToMin";
const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "gray",
  progressColor: "#333",
  cursorColor: "#03dac5",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 100,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

export default function Waveform({ url, hash, songName, reelName }) {
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
          name: "Loaded",
          icon: "visibility",
        };
        const time = new Date().toLocaleString() + "";
        const createdAt = timestamp();
        const eventData = {
          eventNameandIcon,
          songName,
          time,
          reelName,
        };

        app
          .firestore()
          .collection("events")
          .doc(hash)
          .set(
            {
              eventInfo: firebase.firestore.FieldValue.arrayUnion(eventData),
              createdAt,
              songName,
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
        preposition: "to:",
      };
      const seekTo = ConvertCecToMin(timeseek);
      const color = "gold";
      const time = new Date().toLocaleString() + "";
      const eventData = {
        eventNameandIcon,
        songName,
        seekTo,
        color,
        time,
        reelName,
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
      console.log(playing);
    });

    wavesurfer.current.on("pause", function () {
      const createdAt = timestamp();
      const pauseTime = ConvertCecToMin(
        Math.round(wavesurfer.current.getCurrentTime())
      );
      const eventNameandIcon = {
        name: "pause",
        icon: "pause",
        preposition: "at:",
      };

      const color = "tomato";
      const time = new Date().toLocaleString() + "";
      const eventData = {
        eventNameandIcon,
        songName,
        color,
        time,
        pauseTime,
        reelName,
      };

      if (
        wavesurfer.current.getCurrentTime() < wavesurfer.current.getDuration()
      ) {
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
      }
    });

    wavesurfer.current.on("play", function () {
      const startTime = ConvertCecToMin(
        Math.round(wavesurfer.current.getCurrentTime())
      );
      const createdAt = timestamp();
      const eventNameandIcon = {
        name: "Play",
        icon: "play_arrow",
        preposition: "from:",
      };
      const time = new Date().toLocaleString() + "";

      const eventData = {
        eventNameandIcon,
        songName,
        time,
        startTime,
        reelName,
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

    wavesurfer.current.on("finish", function () {
      const eventNameandIcon = {
        name: "Finished Playing",
        icon: "mood",
      };
      const time = new Date().toLocaleString() + "";
      const color = "rgb(31, 199, 98)";
      const createdAt = timestamp();
      const eventData = {
        eventNameandIcon,
        songName,
        time,
        color,
        reelName,
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

      console.log(playing);
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
