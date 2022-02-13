import React, { useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import Event from "../Event";

function Tracking() {
  const allEvents = useFirestore("events");
  const [moreIcon, setMoreIcon] = useState(false);
  const openAccordion = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("block");
    setMoreIcon(!moreIcon);
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
          {allEvents && allEvents.songs.length > 0 ? (
            allEvents.songs
              .slice(0)
              .reverse()
              .map((event, ind) => (
                <div key={ind}>
                  <div className="accordion" onClick={(e) => openAccordion(e)}>
                    <div className="reel__page">
                      <div className="reel__name">
                        {event.reelName ? event.reelName : "Reel name"}
                      </div>
                      <div className="share__link_name">{event.id}</div>
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
                      event.eventInfo
                        .slice(0)
                        .reverse()
                        .map((evi, index) => (
                          <Event
                            key={index}
                            name={evi.eventNameandIcon.name}
                            iconName={evi.eventNameandIcon.icon}
                            evenLocation="Belgrade"
                            eventTime={evi.time}
                            eventChangeTime={evi.seekTo}
                            eventSong={evi.songName}
                            eventColor={evi.color}
                            eventPreposition={evi.eventNameandIcon.preposition}
                            eventPauseTime={evi.pauseTime}
                            eventStartTime={evi.startTime}
                          />
                        ))}
                  </div>
                </div>
              ))
          ) : (
            <h3>No events yet... :/</h3>
          )}
        </div>
        <div className="right__section bg-trans"></div>
      </div>
    </main>
  );
}

export default Tracking;
