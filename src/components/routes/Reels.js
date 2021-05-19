import useFirestore from "../../hooks/useFirestore";
import { Link } from "react-router-dom";

function Reels() {
  const reels = useFirestore("reels");
  const { songs } = useFirestore("songs");

  const openAccordion = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("block");
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
                    Moon Knight <span class="track__duration">(31:39)</span>
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
                          <li>
                            {song.trackName}
                            <span className="track__duration">(02:07)</span>
                          </li>
                        ))}
                    </ol>
                  </div>
                  <div className="btn__container">
                    <button className="mdc-button mdc-button--raised">
                      <span className="mdc-button__ripple"></span>
                      <span className="mdc-button__label">Preview</span>
                    </button>
                    <Link
                      to={{
                        pathname: "/reel",
                        songs: songs.filter((song) =>
                          reels.songs[index][0].includes(song.id)
                        ),
                      }}
                    >
                      Reel
                    </Link>
                    <button className="mdc-button mdc-button--raised">
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
