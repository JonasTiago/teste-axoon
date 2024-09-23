import React, { useEffect, useState } from "react";
import "./EventPage.css";
import { useLocation } from "react-router-dom";
import { formatDate, reverseFormatDate } from "../../ultils/formatData.ts";

const EventPage = () => {
  const location = useLocation();
  const event = location.state;

  const [eventBegin, setEventBegin] = useState(formatDate(event.begin));
  const [seconds, setSeconds] = useState(
    String(new Date(event.begin).getSeconds("00"))
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);

  const API_URL = process.env.REACT_APP_BACK_END_URL;

  useEffect(() => {
    setVideoUrl(
      `${API_URL}/events/${reverseFormatDate(eventBegin)}?videoSourceid=${
        event.videosourceid
      }`
    );
  }, []);

  const handlePlayClick = () => {
    try {
      setVideoLoading(true);

      // console.log(eventBegin);
      // console.log(reverseFormatDate(eventBegin.replace("T", " ")));

      // const [datePart, timePart] = eventBegin.split("T");
      // const [year, month, day] = datePart.split("-");
      // const [hours, minutes] = timePart.split(":");

      // const currentDate = new Date();
      // const milliseconds = String(currentDate.getMilliseconds()).padStart(
      //   3,
      //   "0"
      // );
      // const formattedDateTime = `${year}${month}${day}T${hours}${minutes}${seconds}.${milliseconds}000`;

      setVideoUrl(
        `${API_URL}/events/${reverseFormatDate(
          eventBegin.replace("T", " ")
        )}?videoSourceid=${event.videosourceid}`
      );
    } catch (error) {
      console.error("Error parsing date:", error);
    } finally {
      setVideoLoading(false);
    }
  };

  const generateSecondsOptions = () => {
    const options = [];
    for (let i = 0; i < 60; i += 1) {
      const value = i.toString().padStart(2, "0"); // Garante que seja uma string de dois dígitos
      options.push(
        <option key={value} value={value}>
          {value}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="event-page">
      <h2>
        Moment: {formatDate(event.begin)} - {formatDate(event.end)}
      </h2>
      <div className="camera-stream">
        <input
          type="datetime-local"
          value={eventBegin}
          onChange={(e) => setEventBegin(e.target.value)}
          min={formatDate(event.begin)}
          max={formatDate(event.end)}
        />
        {/* {console.log("min", formatDate(event.begin))} */}
        <select value={seconds} onChange={(e) => setSeconds(e.target.value)}>
          {generateSecondsOptions()}
        </select>
        <button onClick={handlePlayClick} disabled={videoLoading}>
          {videoLoading ? "Loading..." : "Play"}
        </button>
        <video
          controls
          key={videoUrl}
          style={{ display: videoUrl ? "block" : "none" }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* {console.log(videoUrl)} */}
      </div>
    </div>
  );
};

export default EventPage;
