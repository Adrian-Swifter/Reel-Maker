import { useState, useEffect } from "react";
import useFirestore from "../../hooks/useFirestore";
import { Link } from "react-router-dom";
import { app } from "../../firebase/firebase_storage";
import ConvertCecToMin from "../../components/utils/ConvertCecToMin";
import Button from "../../components/Button";

function Reels({ user }) {
  const reels = useFirestore("reels");
  const { songs } = useFirestore("songs");
  const openAccordion = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("block");
  };
  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const addNewHash = (id) => {
    const currentReel = reels.songs.filter((reel) => reel.id === id);

    app
      .firestore()
      .collection("reels")
      .doc(id)
      .update({
        hash: [...currentReel[0].hash, new Date().getTime().toString()],
      });
  };

  const handleSearchSongs = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText === "") {
      setFiltered(reels.songs);
    }
    const filteredSearchSongs =
      reels.songs &&
      reels.songs.filter((reel) =>
        reel.reelName
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    setFiltered(filteredSearchSongs);
  }, [searchText, reels.songs]);

  return (
    <main className="container reels__body">
      {!user ? (
        <div>
          {" "}
          Please log in to see this page <Link to="/">Login</Link>
        </div>
      ) : (
        <>
          <div className="btn__container">
            <header className="search__header pad-10">
              <div className="search__input_contaner">
                <input
                  type="text"
                  id="trackSearchInput"
                  placeholder="Seach reels"
                  onChange={handleSearchSongs}
                />

                <i
                  className="material-icons mdc-button__icon search__icon"
                  aria-hidden="true"
                >
                  search
                </i>
              </div>
            </header>
          </div>

          <div className="main__container">
            <div className="left__section">
              {reels && reels.songs.length > 0 ? (
                filtered
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt.seconds) -
                      new Date(a.createdAt.seconds)
                  )
                  .map((reel, index) => (
                    <div key={reel.id}>
                      <div
                        className="accordion"
                        onClick={(e) => openAccordion(e)}
                      >
                        <div className="reel__name reel__page">
                          {reel.reelName ? reel.reelName : "Reel name"}{" "}
                          <span className="track__duration">
                            {`(${ConvertCecToMin(
                              songs
                                .filter((song) =>
                                  reels.songs[index][0].includes(song.id)
                                )
                                .reduce((a, song) => a + song.trackDuration, 0)
                            )})`}
                          </span>
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
                      <div className="panel">
                        <div className="track__list_container">
                          <ol>
                            {songs
                              .filter((song) =>
                                filtered[index][0].includes(song.id)
                              )
                              .map((song) => (
                                <li key={song.id}>
                                  {song.trackName}
                                  <span className="track__duration">
                                    {` (${ConvertCecToMin(
                                      song.trackDuration
                                    )})`}
                                  </span>
                                </li>
                              ))}
                          </ol>
                        </div>
                        <div className="btn__container">
                          <Link
                            to={{
                              pathname: "/reel",
                              songs: songs.filter((song) =>
                                filtered[index][0].includes(song.id)
                              ),
                              hash: `#${filtered[index].hash[0]}`,
                            }}
                          >
                            <Button buttonName="Preview" buttonIcon="preview" />
                          </Link>

                          <Button
                            buttonName="Add Share Link"
                            buttonIcon="link"
                            onClick={() => addNewHash(reel.id)}
                          />
                        </div>
                        <h3>Share links</h3>
                        <div style={{ cursor: "pointer" }}>
                          {Array.from(reel.hash).map((hash, ind) => {
                            return (
                              <p
                                key={ind}
                                title="Click to copy to clipboard"
                                onClick={(e) => {
                                  navigator.clipboard.writeText(
                                    e.target.innerText
                                  );
                                  e.target.innerText = "Copied!";
                                  setTimeout(() => {
                                    e.target.innerText = `${window.location.origin}/reel#${reel.hash[ind]}`;
                                  }, 1500);
                                }}
                              >{`${window.location.origin}/reel#${hash}`}</p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <h3>No reels yet... :/</h3>
              )}
            </div>
            <div className="right__section bg-trans"></div>
          </div>
        </>
      )}
    </main>
  );
}
export default Reels;
