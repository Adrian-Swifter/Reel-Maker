import React from "react";
import ConvertCecToMin from "../../components/utils/ConvertCecToMin"

const PlayList = ({ tracks, selectedTrack, setSelectedTrack }) => {
  return (
    <div className="playlist">
      {tracks.map((track) => (
        <div
          key={track.id}
          className={
            track.id === selectedTrack.id
              ? "playlist-item selected"
              : "playlist-item"
          }
          onClick={() => setSelectedTrack(track)}
        >
          <span>{track.trackName}</span>
          <span>{ConvertCecToMin(track.trackDuration)}</span>
        </div>
      ))}
    </div>
  );
};

export default PlayList;
