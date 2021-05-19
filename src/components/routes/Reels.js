import useFirestore from "../../hooks/useFirestore";
import { useEffect } from "react";

function Reels() {
  const reels = useFirestore("reels");
  const { songs } = useFirestore("songs");

  console.log(songs, reels);
  // (function () {
  //   var acc = document.getElementsByClassName("accordion");
  //   var i;

  //   for (i = 0; i < acc.length; i++) {
  //     acc[i].addEventListener("click", function () {
  //       this.classList.toggle("active");
  //       var panel = this.nextElementSibling;
  //       if (panel.style.display === "block") {
  //         panel.style.display = "none";
  //       } else {
  //         panel.style.display = "block";
  //       }
  //     });
  //   }
  // })();

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
          {reels && reels.songs.map((reel) => (
              <div key={reel.id}>
                <div className="accordion">
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
                      <li>
                        Knight Kight{" "}
                        <span className="track__duration">(02:07)</span>
                      </li>
                      <li>
                        Knight Kight{" "}
                        <span className="track__duration">(02:07)</span>
                      </li>
                      <li>
                        Knight Kight{" "}
                        <span className="track__duration">(02:07)</span>
                      </li>
                      <li>
                        Knight Kight{" "}
                        <span className="track__duration">(02:07)</span>
                      </li>
                      <li>
                        Knight Kight{" "}
                        <span className="track__duration">(02:07)</span>
                      </li>
                      <li>
                        Knight Kight{" "}
                        <span className="track__duration">(02:07)</span>
                      </li>
                      <li>
                        Knight Kight{" "}
                        <span className="track__duration">(02:07)</span>
                      </li>
                      <li>
                        Knight Kight{" "}
                        <span className="track__duration">(02:07)</span>
                      </li>
                      <li>
                        Knight Kight{" "}
                        <span className="track__duration">(02:07)</span>
                      </li>
                      <li>
                        Knight Kight{" "}
                        <span className="track__duration">(02:07)</span>
                      </li>
                    </ol>
                  </div>
                  <div className="btn__container">
                    <button
                      
                      className="mdc-button mdc-button--raised"
                    >
                      <span className="mdc-button__ripple"></span>
                      <span className="mdc-button__label">Preview</span>
                    </button>

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
