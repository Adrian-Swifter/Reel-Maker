import useFirestore from "../../hooks/useFirestore";
import { Link } from "react-router-dom";
import { app } from "../../firebase/firebase_storage";

function Reels() {
  const reels = useFirestore("reels");
  const { songs } = useFirestore("songs");
  const currentReel = useFirestore("reelSongsData");
  const openAccordion = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("block");
  };
  const saveReelsSongs = (songs, reel) => {
    app.firestore().collection("reelSongsData").add({ songs, reel });
  };

  return (
    <main className="container reels__body">
      <div className="btn__container">
        <header className="search__header pad-10">
          <div className="search__input_contaner">
            <input
              type="text"
              id="trackSearchInput"
              placeholder="Seach reels"
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
          {reels &&
            reels.songs.map((reel, index) => (
              <div key={reel.id}>
                <div className="accordion" onClick={(e) => openAccordion(e)}>
                  <div className="reel__name reel__page">
                    Moon Knight <span className="track__duration">(31:39)</span>
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
                          reels.songs[index][0].includes(song.id)
                        )
                        .map((song) => (
                          <li key={song.id}>
                            {song.trackName}
                            <span className="track__duration">(02:07)</span>
                          </li>
                        ))}
                    </ol>
                  </div>
                  <div className="btn__container">
                    <Link
                      to={{
                        pathname: "/reel",
                        songs: songs.filter((song) =>
                          reels.songs[index][0].includes(song.id)
                        ),
                        reelSongs: currentReel.songs[0],
                        hash: `#${reels.songs[index].hash}`,
                      }}
                    >
                      <button className="mdc-button mdc-button--raised">
                        <span className="mdc-button__ripple"></span>
                        <span className="mdc-button__label">Preview</span>
                      </button>
                    </Link>
                    <button
                      className="mdc-button mdc-button--raised"
                      onClick={() =>
                        saveReelsSongs(
                          songs.filter((song) =>
                            reels.songs[index][0].includes(song.id)
                          ),
                          reel
                        )
                      }
                    >
                      <span className="mdc-button__ripple"></span>
                      <span className="mdc-button__label">Add Share Link</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="right__section bg-trans"></div>
      </div>
    </main>
  );
}

export default Reels;
