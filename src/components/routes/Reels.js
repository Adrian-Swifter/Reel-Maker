import useFirestore from "../../hooks/useFirestore";
import { Link, useLocation } from "react-router-dom";
import { app } from "../../firebase/firebase_storage";

function Reels() {
  const reels = useFirestore("reels");
  const { songs } = useFirestore("songs");
  const location = useLocation();

  const openAccordion = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("block");
  };

  const addNewHash = (id, index) => {
    app
      .firestore()
      .collection("reels")
      .doc(id)
      .update({
        hash: [
          ...reels.songs[index].hash,
          Math.random().toString(36).substring(7),
        ],
      });
  };

  console.log(reels.songs);

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
          {reels && reels.songs.length > 0 ? (
            reels.songs.map((reel, index) => (
              <div key={reel.id}>
                <div className="accordion" onClick={(e) => openAccordion(e)}>
                  <div className="reel__name reel__page">
                    {reel.reelName ? reel.reelName : "Reel name"}{" "}
                    <span className="track__duration">(31:39)</span>
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
                        hash: `#${reels.songs[index].hash[0]}`,
                      }}
                    >
                      <button className="mdc-button mdc-button--raised">
                        <span className="mdc-button__ripple"></span>
                        <span className="mdc-button__label">Preview</span>
                      </button>
                    </Link>
                    <button
                      onClick={() => addNewHash(reel.id, index)}
                      className="mdc-button mdc-button--raised"
                    >
                      <span className="mdc-button__ripple"></span>
                      <span className="mdc-button__label">Add Share Link</span>
                    </button>
                  </div>
                  <h3>Share links</h3>
                  <div style={{ cursor: "pointer" }}>
                    {Array.from(reel.hash).map((hash, ind) => {
                      return (
                        <p
                          key={ind}
                          title="Click to copy to clipboard"
                          onClick={(e) => {
                            navigator.clipboard.writeText(e.target.innerText);
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
    </main>
  );
}

export default Reels;
