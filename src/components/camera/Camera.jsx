import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import LiveStream from "../liveStream/LiveStream";
import Img from './Img'

import React from 'react';
import styled, { keyframes } from 'styled-components';
import "./style.css";

export default function Camera() {
  const [cameraUrl, setCameraUrl] = useState('');
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const videosourceid = location.state;
  // const [camera, setCamera] = useState(null);

  // accessPoint.replace("hosts/", "")

  useEffect(() => {
    findCamera();
  }, [])


// console.log(`${process.env.REACT_APP_BACK_END_URL_TOKEN}/live/media/${accessPoint.replace(/_/g, '/')}?w=650&h=400`)

  async function findCamera() {
    // const API_URL = process.env.REACT_APP_BACK_END_URL;
    try {
      const uuid = await axios.get(`http://127.0.0.1/uuid`,{
        auth: {
          username: "root",
          password: "Big4dev2024"
        },
        headers: {                  
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization", 
          "Cache-Control": "no-cache"                  
      },
      });
      setCameraUrl(`${process.env.REACT_APP_BACK_END_URL}/live/media/${videosourceid}?w=650&h=400/${uuid}`);
      fetchEvents()
    } catch (error) {
      console.log(error);
      alert("Erro! Não foi possível buscar os nomes!");
    }
  }

  async function fetchEvents() {
    const API_URL = process.env.REACT_APP_BACK_END_URL;
    try {
      const {data} = await axios.get(`${API_URL}/archive/events/detectors/${videosourceid}/past/future`,{
        auth: {
          username: "root",
          password: "Big4dev2024"
        },
        headers: {                  
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization", 
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
          "Content-Type": "application/json;charset=UTF-8",
          "Cache-Control": "no-cache"
      },
      });
      const events = data.events
      console.log(events)
      setEvents(events);
    } catch (error) {
      console.log(error);
      alert("Erro! Não foi possível buscar os nomes!");
    }
  }

  if (!videosourceid) {
    return <div>Loading...</div>;
  }

  return (
    <div className="camera-detail">
      <div className="camera-stream">
        <h3>Camera Live <LiveIndicator />  {cameraUrl.name}</h3>
        <LiveStream url={`/live/media/${videosourceid}?w=650&h=400&enable_token_auth=1&valid_token_hours=1`} />
      </div>
      <div className="camera-events">
        <h3>Camera Events</h3>
        <ul>
          {events.length > 0 ? events.filter(event => event.alertState === 'began').map( event => (
            <Link to={'/event'} state={event} key={1}>
              <li key={event.id} className="eventSigle">
                <strong>Type:</strong> {event.type}
                <strong>Timestamp:</strong> {event.timestamp}
                <Img videosourceid={videosourceid} event={event} />
              </li>
            </Link>
          )): ''}
        </ul>
      </div>
    </div>
  );
}

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

const LiveIndicator = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  animation: ${pulse} 1s infinite;
`;

// {`${process.env.REACT_APP_BACK_END_URL_TOKEN}/live/media/${accessPoint.replace(/_/g, '/')}?w=650&h=400`}