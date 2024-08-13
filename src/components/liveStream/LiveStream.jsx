import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACK_END_URL;

const LiveStream = ({ camera }) => {
  const [cameraUrl, setCameraUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStreamUrl = async () => {
      const cameraPath = camera
      const url = `/live/media/${cameraPath}?w=650&h=400&enable_token_auth=1&valid_token_hours=1`;

      try {
        const authenticatedUrl = `${API_URL}${url}`;

        const response = await axios.get(authenticatedUrl, {
          auth: {
            username: "root",
            password: "Big4dev2024"
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache"
          }
        });

        if (response.status === 200) {
          setCameraUrl(API_URL+response.data.path);
        } else {
          throw new Error('Não foi possível acessar o stream.');
        }
      } catch (error) {
        console.error("Erro ao buscar o stream da câmera:", error);
        alert("Erro ao carregar o stream da câmera");
      } finally {
        setLoading(false);
      }
    };

    fetchStreamUrl();
  }, [camera]);

  return (
    <div className="livestream-container">
      {loading ? (
        <p>Carregando stream da câmera...</p>
      ) : (
        cameraUrl.length > 0 ?  
          <iframe 
            src={cameraUrl}
            width="650px" 
            height="400px" 
            id="iframe"
            title={`Camera Stream: ${camera.displayName}`}
          >
            Stream não disponível
          </iframe>
        : <p>Stream não disponível</p>
      )}
    </div>
  );
};

export default LiveStream;
