import React from "react";

function Event(props) {
  return (
    <div className="event__wrapper">
      <div className="icon__event_wrapper">
        <div className="event__icon">
          <div className="icon__holder">
            <i class="material-icons mdc-button__icon" aria-hidden="true">
              {props.iconName}
            </i>
          </div>
        </div>
        <div className="event__info">
          <div className="event__name">{props.name} <span className="track__duration">(at {props.eventChangeTime})</span></div>
          <div className="event__song">{props.eventSong}</div>
          <div className="event__location_time">
            <span className="event__location">{props.evenLocation}</span>, 
            <span className="event__time"> {props.eventTime}</span>
          </div>
        </div>
      </div>
      <div className="delete__icon">
        <i class="material-icons mdc-button__icon" aria-hidden="true">
          delete
        </i>
      </div>
    </div>
  );
}

export default Event;
