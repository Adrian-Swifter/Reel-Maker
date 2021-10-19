import React, { useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import Event from "../Event";

function Tracking() {
  const reels = useFirestore("reels");
  const allEvents = useFirestore("events");
  const [moreIcon, setMoreIcon] = useState(false);
  const openAccordion = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("block");
    setMoreIcon(!moreIcon);
  };
  console.log(allEvents.songs)
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
          {allEvents &&
            allEvents.songs.map((event) => (
              <div key={event.id}>
                <div className="accordion" onClick={(e) => openAccordion(e)}>
                  <div className="reel__page">
                    <div className="reel__name">Event name</div>
                    <div className="share__link_name">{event.hash}</div>
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
                      {moreIcon ? "expand_less" : "expand_more"}
                    </i>
                  </div>
                </div>
                <div className="panel">
                  {allEvents &&
                    event.eventInfo.map((evi) => (
                      <Event
                        key={event.id}
                        name={evi.eventName}
                        iconName="play_arrow"
                        evenLocation="Belgrade"
                        //eventTime={event.createdAt}
                        eventChangeTime={evi.seekTo}
                        eventSong={evi.songName}
                      />
                    ))}
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
