import { useState, useEffect } from "react";
import useFirestore from "../../hooks/useFirestore";
import Event from "../Event";
import { app } from "../../firebase/firebase_storage";

function Tracking() {
  const allEvents = useFirestore("events");
  const [moreIcon, setMoreIcon] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState([]);

  const openAccordion = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle("block");
    setMoreIcon(!moreIcon);
  };

  const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "Tablet";
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "Mobile";
    }
    return "Desktop";
  };

  const handleEventDelete = (id) => {
    alert("Are you sure you want to delete this event collection?");
    app.firestore().collection("events").doc(id).delete();
  };

  const handleSearchSongs = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText === "") {
      setFiltered(allEvents.songs);
    }
    const filteredSearchSongs = allEvents.songs.filter(
      (event) =>
        event.eventInfo[0].reelName
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        event.id.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    setFiltered(filteredSearchSongs);
  }, [searchText, allEvents.songs]);

  return (
    <main className="container reels__body">
      <div className="btn__container">
        <header className="search__header pad-10">
          <div className="search__input_contaner">
            <input
              type="text"
              id="trackSearchInput"
              placeholder="Seach by reel name of by share link name"
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
          {allEvents && allEvents.songs.length > 0 ? (
            filtered
              .sort(
                (a, b) =>
                  new Date(b.createdAt.seconds) - new Date(a.createdAt.seconds)
              )
              .map((event, ind) => (
                <div key={ind}>
                  <div className="accordion" onClick={(e) => openAccordion(e)}>
                    <div className="reel__page">
                      <div className="reel__name">
                        {event.eventInfo[0].reelName
                          ? event.eventInfo[0].reelName
                          : "Reel name"}
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
                    <div
                      onClick={() => handleEventDelete(event.id)}
                      className="delete__icon"
                    >
                      <i
                        className="material-icons mdc-button__icon"
                        aria-hidden="true"
                      >
                        delete
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
                            eventId={event.id}
                            name={evi.eventNameandIcon.name}
                            iconName={evi.eventNameandIcon.icon}
                            deviceType={deviceType}
                            eventTime={evi.time}
                            eventChangeTime={evi.seekTo}
                            eventSong={evi.songName}
                            eventColor={evi.color}
                            eventPreposition={evi.eventNameandIcon.preposition}
                            eventPauseTime={evi.pauseTime}
                            eventStartTime={evi.startTime}
                            handleEventDelete={handleEventDelete}
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
