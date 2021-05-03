import { app, timestamp } from "../../firebase/firebase_storage";
import { useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import Button from "../../components/Button";
import Modal from "../Modal";

function Tracks() {
  const { songs } = useFirestore("songs");
  const [value, setValue] = useState("Unfiled");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const makeFolder = (e) => {
    setValue(e.target.value);
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(`${value}/` + file.name);
    console.log(file, "file bruda");
    const collRef = app.firestore().collection("songs");
    fileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const url = await fileRef.getDownloadURL();
        const folder = value;
        const trackName = file.name;
        const fileSize = `${file.size / 1e6} MB`;
        const createdAt = timestamp();
        collRef.add({ url, folder, trackName, fileSize, createdAt });
        setUrl(url);
        console.log(url);
      }
    );
  };

  return (
    <div className="container">
      <div class="btn__container">
        <Button buttonName="Upload Tracks" buttonIcon="file_upload" />
      </div>
      <div className="main__container">
        <div className="left__section">
          {songs &&
            songs.map((song) => (
              <div className="folder" key={song.id}>
                <div className="icon__holder">
                  <i
                    className="material-icons mdc-button__icon"
                    aria-hidden="true"
                  >
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
        <div className="right__section">
          <div className="track__search_and_kebab_container">
            <div className="search__input_contaner">
              <input
                type="text"
                id="trackSearchInput"
                placeholder="Filter by name or tag"
              />

              <i
                className="material-icons mdc-button__icon search__icon"
                aria-hidden="true"
              >
                search
              </i>
            </div>
            <div className="kebab__menu_container">
              <i className="material-icons mdc-button__icon" aria-hidden="true">
                more_vert
              </i>
            </div>
          </div>

          <div className="tracks__view_container">
            {songs &&
              songs.map((song) => (
                <div className="track__wrapper" key={song.id}>
                  <div className="mdc-form-field">
                    <div className="mdc-checkbox">
                      <input
                        type="checkbox"
                        className="mdc-checkbox__native-control"
                        id="checkbox-1"
                      />
                      <div className="mdc-checkbox__background">
                        <svg
                          className="mdc-checkbox__checkmark"
                          viewBox="0 0 24 24"
                        >
                          <path
                            className="mdc-checkbox__checkmark-path"
                            fill="none"
                            d="M1.73,12.91 8.1,19.28 22.79,4.59"
                          />
                        </svg>
                        <div className="mdc-checkbox__mixedmark"></div>
                      </div>
                      <div className="mdc-checkbox__ripple"></div>
                    </div>
                    <div className="track">
                      <div className="play__button">
                        <i
                          className="material-icons mdc-button__icon"
                          aria-hidden="true"
                        >
                          play_circle_filled
                        </i>
                      </div>
                      <div className="song">
                        {song.trackName}{" "}
                        <span className="track__duration">(1:24)</span>
                      </div>
                      <div className="settings">
                        <i
                          className="material-icons mdc-button__icon"
                          aria-hidden="true"
                        >
                          settings
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Modal progress={progress} onChange={onChange} />
    </div>
  );
}

export default Tracks;
