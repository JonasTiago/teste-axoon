
import React, { useEffect, useState } from 'react';
import EventDetails from './components/EventDetails';
import VideoPlayer from './components/VideoPlayer';
import './EventPage.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import LiveStream from '../liveStream/LiveStream';

const EventPage = () => {
  const location = useLocation();
  // const [videoUrl, setVideoUrl] = useState();
  const event = location.state;

  // useEffect(() => {
  //   getVideoPre();
  // }, [event]);

  // async function getVideoPre() {
  //   const API_URL = process.env.REACT_APP_BACK_END_URL;

  //   try {
  //     // http://127.0.0.1:80/archive/media/LAPTOP-3UEDE0C4/DeviceIpint.3/SourceEndpoint.video:0:0/20240812T171530.093000?speed=1&w=640&h=480
    
  //       const { data } = await axios.get(`${API_URL}`,{
  //         auth: {
  //           username: "root",
  //           password: "Big4dev2024"
  //         },
  //         headers: {                  
  //           "Access-Control-Allow-Origin": "*",
  //           "Access-Control-Allow-Headers": "Authorization", 
  //           "Cache-Control": "no-cache"                  
  //       },
  //       });
  //       setVideoUrl(`${API_URL}/archive/media/${event.source.replace("hosts/", "","")}/${event.timestamp}?speed=1&w=640&h=480`);

  //   } catch (error) {
  //     console.log(error);
  //     alert("Erro!");
  //   }
  // }

  return (
    <div className="event-page">
      {event ? 
      <EventDetails event={event} />
      : <h1>Evento</h1>}
      <h3>Pré-Evento</h3>
      <div className="camera-stream">
        <LiveStream  url={`/archive/media/${event.source.replace("hosts/", "")}/${event.timestamp}?speed=1&enable_token_auth=1&valid_token_hours=1`} />
      </div>
      
    </div>
  );
};

export default EventPage;