import { app, timestamp } from "../../firebase/firebase_storage";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";
import Button from "../../components/Button";
import UploadModal from "../Modal";
import ConvertCecToMin from "../utils/ConvertCecToMin";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "500px",
  },
};

Modal.setAppElement("#root");

function Tracks({ user }) {
  const { songs } = useFirestore("songs");
  let hash = Math.random().toString(36).substring(7);
  const [value, setValue] = useState("Unfiled");
  const [filtered, setFiltered] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [modalStyle, setModalStyle] = useState(false);
  const [ind, setInd] = useState(0);
  const [reelSongs, setReelSongs] = useState([]);
  const [reelName, setReelName] = useState("");
  const [file, setFile] = useState({});
  const [tags, setTags] = useState([]);
  const [songId, setSongId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [trackName, setTrackName] = useState("");
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  console.log(location.pathname);
  const uniqueSongs = [];
  let tempArr = [];
  let counts = {};
  songs.forEach((song) => {
    let tracksNum = song.folder;
    counts[tracksNum] = counts[tracksNum] ? counts[tracksNum] + 1 : 1;
    if (!tempArr.includes(song.folder)) {
      tempArr.push(song.folder);
      uniqueSongs.push(song);
    }
  });

  function openModal(songId) {
    setIsOpen(true);
    setSongId(songId);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const setReelNameHandler = (e) => {
    setReelName(e.target.value);
  };

  const makeFolder = (e) => {
    setValue(e.target.value);
  };

  const handleTrackTags = (e) => {
    const tags = e.target.value.split(",");
    setTags(tags);
  };

  const handleTracknameInputChange = (e) => {
    const trackName = e.target.value;
    setTrackName(trackName);
  };

  const addNewTags = (id) => {
    let indexOfSong;
    songs.filter((song, index) => {
      if (song.id === id) {
        indexOfSong = index;
      }
    });
    const currentTags = songs[indexOfSong].trimmedTags
      ? songs[indexOfSong].trimmedTags
      : [];
    app
      .firestore()
      .collection("songs")
      .doc(id)
      .update({
        trimmedTags: [...currentTags, ...tags],
      });
    setTags("");
  };

  const updateTrackName = (id) => {
    app.firestore().collection("songs").doc(id).update({
      trackName: trackName,
    });
  };

  const handleModal = () => {
    setModalStyle(!modalStyle);
  };

  const handleFolderClick = (folder, index, e) => {
    setValue(folder);
    setInd(index);
  };

  const onCheckboxClick = (songId) => {
    if (!reelSongs.includes(songId)) {
      setReelSongs([...reelSongs, songId]);
    } else {
      setReelSongs(reelSongs.filter((sid) => sid !== songId));
    }
  };

  const addToReels = () => {
    const createdAt = timestamp();
    if (reelSongs.length > 0) {
      app
        .firestore()
        .collection("reels")
        .add({ ...[reelSongs], hash: [hash], reelName, createdAt });
      setReelSongs([]);
      setReelName("");
    } else if (reelName === "") {
      alert("Please enter the new reel name");
    } else {
      alert("You need to add some tracks first");
    }
  };

  useEffect(() => {
    setFiltered(songs.filter((song) => song.folder === value));
  }, [value]);

  useEffect(() => {
    const filteredSearchSongs = songs.filter((song) => {
      const booleanArray = [];

      song.trimmedTags &&
        song.trimmedTags.map((tag) =>
          booleanArray.push(
            tag.toString().toLowerCase().includes(searchText.toLowerCase())
          )
        );

      return (
        song.trackName
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) || booleanArray.includes(true)
      );
    });
    setFiltered(filteredSearchSongs);

    if (searchText === "") {
      setFiltered([]);
    }
  }, [searchText]);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSearchSongs = (e) => {
    setSearchText(e.target.value);
  };

  const handleTrackUpload = () => {
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
      (error) => {
        setError(error);
      },
      async () => {
        const url = await fileRef.getDownloadURL();
        const audioFile = new Audio(url);
        const folder = value;
        const trackName = file.name;
        const fileSize = `${file.size / 1e6} MB`;
        const createdAt = timestamp();
        const trimmedTags = tags.map((tag) => tag.trim());

        audioFile.addEventListener("loadedmetadata", () => {
          const trackDuration = audioFile.duration;
          collRef.add({
            url,
            folder,
            trackName,
            fileSize,
            createdAt,
            trackDuration,
            trimmedTags,
          });
        });

        setUrl(url);
        setTags("");
      }
    );
  };

  console.log(reelSongs);

  return (
    <div className="container">
      {!user ? (
        <div>
          {" "}
          Please log in to see this page <Link to="/">Login</Link>
        </div>
      ) : (
        <>
          <div
            style={
              location.pathname.includes("tracks")
                ? { display: "block" }
                : { display: "none" }
            }
            className="btn__container"
          >
            <Button
              buttonName="Upload Tracks"
              buttonIcon="file_upload"
              handleModal={handleModal}
            />
          </div>
          <div className="main__container">
            <div className="left__section">
              {songs &&
                uniqueSongs.map((song, index) => (
                  <div
                    className={`folder ${index === ind ? "bg__on_click" : ""}`}
                    key={song.id}
                    onClick={(e) => handleFolderClick(song.folder, index, e)}
                  >
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
                          <span className="num__of_tracks">
                            {`${counts[song.folder]} `}
                          </span>
                          tracks
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
              <div
                style={
                  location.pathname.includes("maker")
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <input
                  onChange={setReelNameHandler}
                  type="text"
                  placeholder="Name of the new reel"
                />
                <button onClick={addToReels}>Add Tracks To New Reel</button>
              </div>
              <div className="track__search_and_kebab_container">
                <div className="search__input_contaner">
                  <input
                    type="text"
                    id="trackSearchInput"
                    placeholder="Filter by name or tag"
                    onChange={(e) => handleSearchSongs(e)}
                  />

                  <i
                    className="material-icons mdc-button__icon search__icon"
                    aria-hidden="true"
                  >
                    search
                  </i>
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

              <div className="tracks__view_container">
                {songs &&
                  filtered.map((song) => (
                    <div className="track__wrapper" key={song.id}>
                      <div className="mdc-form-field">
                        <div className="mdc-checkbox">
                          <input
                            type="checkbox"
                            className="mdc-checkbox__native-control"
                            id="checkbox-1"
                            onChange={() => onCheckboxClick(song.id)}
                            defaultChecked={reelSongs.includes(song.id)}
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
                            {song.trackName}
                            <span className="track__duration">{` (${ConvertCecToMin(
                              song.trackDuration
                            )})`}</span>
                          </div>
                          <div className="settings">
                            <i
                              className="material-icons mdc-button__icon"
                              aria-hidden="true"
                              onClick={() => openModal(song.id)}
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
          <div
            style={
              location.pathname.includes("tracks")
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <UploadModal
              progress={progress}
              onChange={onChange}
              makeFolder={makeFolder}
              modalStyle={modalStyle}
              handleTrackUpload={handleTrackUpload}
              handleTrackTags={handleTrackTags}
              tags={tags}
            />
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2>Track details</h2>
            <button onClick={closeModal}>close</button>

            {songs
              .filter((song) => song.id === songId)
              .map((track) => (
                <ul key={track.id}>
                  <li>
                    Name:{" "}
                    <input
                      type="text"
                      defaultValue={track.trackName}
                      onChange={handleTracknameInputChange}
                    />
                    <button onClick={() => updateTrackName(track.id)}>
                      Update name
                    </button>
                  </li>
                  <li>
                    Tags:
                    {track.trimmedTags
                      ? track.trimmedTags.map((tag, index) => (
                          <span className="tag" key={index}>
                            {tag}
                          </span>
                        ))
                      : "No tags for this track "}
                    <input
                      type="text"
                      placeholder="Enter comma separated tags"
                      onChange={handleTrackTags}
                      value={tags}
                    />
                    <button onClick={() => addNewTags(track.id)}>
                      Add tags
                    </button>
                  </li>
                  <li>Duration: {`${ConvertCecToMin(track.trackDuration)}`}</li>
                  <li>File Size: {track.fileSize}</li>
                </ul>
              ))}
          </Modal>
        </>
      )}
    </div>
  );
}

export default Tracks;
