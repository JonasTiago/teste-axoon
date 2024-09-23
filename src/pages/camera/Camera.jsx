import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../ultils/formatData.ts";
import ArchiveStream from "../../components/liveStream/LiveStream";

import React from "react";
import "./style.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACK_END_URL;

export default function Camera() {
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const videosourceid = location.state;

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const API_URL = process.env.REACT_APP_BACK_END_URL;
    try {
      const { data } = await axios.get(
        `${API_URL}/events?videoSourceid=${videosourceid}`
      );
      setEvents(
        data.intervals.map((e) => {
          return {
            begin: e.begin,
            end: e.end,
            videosourceid,
          };
        })
      );
    } catch (error) {
      console.log(error);
      alert("Erro! Não foi possível buscar os events!");
    }
  }

  if (!videosourceid) {
    return <div>Loading...</div>;
  }

  return (
    <div className="camera-detail">
      <div className="camera-stream">
        <h3>Camera Live</h3>
        <img
          src={`${API_URL}/cameras/live?videoSourceid=${videosourceid}`}
          alt=""
        />
        {/* <iframe
          src={`${API_URL}/cameras/live?videoSourceid=${videosourceid}`}
          id="videoIframe"
          title="Archive Camera Stream"
        >
          Stream não disponível
        </iframe> */}
      </div>
      <div className="camera-events">
        <h3>Camera Moments</h3>
        <ul>
          {events?.length > 0
            ? events.reverse().map((event, i) => (
                <Link key={i} to={"/event"} state={{ ...event, videosourceid }}>
                  <li className="eventSigle">
                    <div>
                      <strong>Incio de gravação:</strong>
                      <br />
                      {formatDate(event.begin)}
                    </div>
                    <img
                      src={`${API_URL}/events/frame/snapshot/${event.begin}?videoSourceid=${videosourceid}`}
                      alt=""
                    />
                  </li>
                </Link>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
}
