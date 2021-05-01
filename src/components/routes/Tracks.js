import { app } from "../../firebase/firebase_storage";
import { useState } from "react";
import useFirestore from "../../hooks/useFirestore";

function Tracks() {
  const { songs } = useFirestore("songs");
  const [value, setValue] = useState("Unfiled");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const makeFolder = (e) => {
    setValue(e.target.value);
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(`${value}/` + file.name);
    const collRef = app.firestore().collection("songs");
    fileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await fileRef.getDownloadURL();
        const folder = value;
        collRef.add({ url, folder });
        setUrl(url);
        console.log(url);
      }
    );
  };

  return (
    <div>
      {" "}
      <div className="tracks">
        <h1>Tracks</h1>
        <input type="text" onChange={makeFolder} />
        <input type="file" onChange={onChange} />
        <progress value={progress} max="100"></progress>
      </div>
      <div className="main__container">
        <div className="left__section">
          {songs &&
            songs.map((song) => (
              <div className="folder" key={song.id}>
                <div className="icon__holder">
                  <i className="material-icons mdc-button__icon" aria-hidden="true">
                    folder
                  </i>
                </div>
                <div className="text__and_menu">
                  <div className="folder__text_container">
                    <h3 className="folder__title">{song.folder}</h3>
                    <div className="num__of_tracks_container">
                      <span className="num__of_tracks">361</span> tracks
                    </div>
                  </div>
                  <div className="kebab__menu_container">
                    <i
                      className="material-icons mdc-button__icon"
                      aria-hidden="true"
                    >
                      more_vert
                    </i>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="songs">
          {songs &&
            songs.map((song) => (
              <audio controls key={song.id}>
                <source src={song.url}></source>
              </audio>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Tracks;
