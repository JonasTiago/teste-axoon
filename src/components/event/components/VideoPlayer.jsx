import React, { useEffect, useState } from 'react';
import './VideoPlayer.css';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACK_END_URL;

const VideoPlayer = ({ event }) => {
  // const [cameraUrl, setCameraUrl] = useState('');
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStreamUrl = async () => {
      const url = `http://127.0.0.1:80/archive/media/LAPTOP-3UEDE0C4/DeviceIpint.3/SourceEndpoint.video:0:0/20240812T171530.093000/?speed=1&w=640&h=480`;

      try {

        const response = await axios.get(`${url}`, {
          auth: {
            username: "root",
            password: "Big4dev2024"
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache"
          }
        });

        console.log('respo', response);

        // if (response.status === 200) {
        //   setCameraUrl(API_URL+response.data.path);
        // } else {
        //   throw new Error('Não foi possível acessar o stream.');
        // }
      } catch (error) {
        console.error("Erro ao buscar o stream da câmera:", error);
        alert("Erro ao carregar o stream da câmera");
      } 
      // finally {
      //   setLoading(false);
      // }
    };

    fetchStreamUrl();
  }, []);

  const stop = async () => {
    const url = `http://127.0.0.1/archive/media/stop/e510e0ab-085d-492b-992b-f41d48f39386`;

    try {

      const response = await axios.get(`${url}`, {
        auth: {
          username: "root",
          password: "Big4dev2024"
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache"
        }
      });

      console.log('respo', response);

      // if (response.status === 200) {
      //   setCameraUrl(API_URL+response.data.path);
      // } else {
      //   throw new Error('Não foi possível acessar o stream.');
      // }
    } catch (error) {
      console.error("Erro ao buscar o stream da câmera:", error);
      alert("Erro ao carregar o stream da câmera");
    } 
  }

  return (
    <div className="video-player">
      <iframe 
            src='http://127.0.0.1/archive/media/LAPTOP-3UEDE0C4/DeviceIpint.3/SourceEndpoint.video:0:0/20240813T115805.708000?h=800&speed=4&id=e510e0ab-085d-492b-992b-f41d48f39386'
            width="650px" 
            height="400px" 
            id="iframe"
            title={`Camera Stream: ${'ds'}`}
          >
            Stream não disponível
      </iframe>
      <button onClick={() => stop()}>Pausar</button>
      {/* <a href="http://127.0.0.1/archive/media/stop/e510e0ab-085d-492b-992b-f41d48f39386"></a> */}
      {/* <video controls
        autoPlay
        src='http://127.0.0.1/archive/media/LAPTOP-3UEDE0C4/DeviceIpint.3/SourceEndpoint.video:0:0/20240813T115805.708000?speed=4&id=e510e0ab-085d-492b-992b-f41d48f39386' 
          >
      </video> */}
    </div>
  );
};

export default VideoPlayer;
