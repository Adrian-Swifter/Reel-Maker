import React, {useState} from "react";
import useFirestore from "../../hooks/useFirestore";
import Event from "../Event";

function Tracking() {
  const reels = useFirestore("reels");
  const { songs } = useFirestore("songs");
  const [moreIcon, setMoreIcon] = useState(false)
  const openAccordion = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("block");
    setMoreIcon(!moreIcon)
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
                  <div className="reel__page">
                    <div className="reel__name">
                      Moon Knight
                      <span className="track__duration">(31:39)</span>
                    </div>
                    <div className="share__link_name">Share link name</div>
                    <div>
                      Opens: <span className="num__of_opens">2</span>
                    </div>
                    <div>
                      Last Actitity: <span className="last__activity">2</span>{" "}
                      hours ago
                    </div>
                  </div>
                  <div className="kebab__menu_container">
                    <i
                      className="material-icons mdc-button__icon"
                      aria-hidden="true"
                    >
                      {moreIcon ? "expand_less" : "expand_more" }
                    </i>
                  </div>
                </div>
                <div className="panel">
                  <Event
                    name="Event Name"
                    iconName="play_arrow"
                    evenLocation="Belgrade"
                    eventTime="10 days ago"
                    eventChangeTime="10:35"
                    eventSong="Random Song Name"
                  />
                  <Event
                    name="Event Name"
                    iconName="stop"
                    evenLocation="Belgrade"
                    eventTime="10 days ago"
                    eventChangeTime="10:35"
                    eventSong="Random Song Name"
                  />
                  <Event
                    name="Event Name"
                    iconName="pause"
                    evenLocation="Belgrade"
                    eventTime="10 days ago"
                    eventChangeTime="10:35"
                    eventSong="Random Song Name"
                  />
                  <Event
                    name="Event Name"
                    iconName="pause"
                    evenLocation="Belgrade"
                    eventTime="10 days ago"
                    eventChangeTime="10:35"
                    eventSong="Random Song Name"
                  />
                  <Event
                    name="Event Name"
                    iconName="pause"
                    evenLocation="Belgrade"
                    eventTime="10 days ago"
                    eventChangeTime="10:35"
                    eventSong="Random Song Name"
                  />
                  <Event
                    name="Event Name"
                    iconName="pause"
                    evenLocation="Belgrade"
                    eventTime="10 days ago"
                    eventChangeTime="10:35"
                    eventSong="Random Song Name"
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="right__section bg-trans"></div>
      </div>
    </main>
  );
}

export default Tracking;
