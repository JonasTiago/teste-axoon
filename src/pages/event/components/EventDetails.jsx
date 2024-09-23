import React from "react";
import "./EventDetails.css";

const API_URL = process.env.REACT_APP_BACK_END_URL;

const EventDetails = ({ event }) => {
  return (
    <div className="event-details">
      <div>
        <h1>Event</h1>
        <div className="event-image">
          <img
            src={`${API_URL}/events/frame/snapshot/${
              event.timestamp
            }?videoSourceid=${event.source.replace("hosts/", "")}`}
            alt=""
          />
        </div>
      </div>

      <div className="event-info">
        <h2>{event.type}</h2>
        <p>
          <strong>Estado do Alerta:</strong> {event.alertState}
        </p>
        <p>
          <strong>ID:</strong> {event.id}
        </p>
        <p>
          <strong>Multi-Phase Sync ID:</strong> {event.multiPhaseSyncId}
        </p>
        <p>
          <strong>Origem:</strong> {event.origin}
        </p>
        <p>
          <strong>Fonte:</strong> {event.source}
        </p>
        <p>
          <strong>Timestamp:</strong> {event.timestamp}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
