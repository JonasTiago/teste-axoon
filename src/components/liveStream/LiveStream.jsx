import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_BACK_END_URL;


const ArchiveStream = ({ url }) => {
  const [cameraUrl, setCameraUrl] = useState('');

  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        console.log("response", `${API_URL}${url}`);
        const response = await axios.get(`${API_URL}${url}`, {
          auth: {
            username: 'root',
            password: 'Big4dev2024',
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache',
          },
        });

        if (response.status === 200) {
          const fullUrl = response.data.path;
          setCameraUrl(fullUrl);

        } else {
          throw new Error('Não foi possível acessar o stream.');
        }
      } catch (error) {
        console.error('Erro ao buscar o stream da câmera:', error);
      } 
    };

    fetchStreamUrl();
  }, [url]);

  // Function for sending messages to the iframe (consider error handling)
 
  return (
    <div className="archive-stream-container">
      {console.log("cameraUrl", cameraUrl)}{
        cameraUrl.length > 0 ? (
          <div>
            <video src={`http://localhost:3000${cameraUrl}`} autoPlay controls>
            </video>
            {/* <iframe
              src={cameraUrl}
              width="650px"
              height="300px"
              id="videoIframe"
              title="Archive Camera Stream"
            >
              Stream não disponível
            </iframe> */}
        
          </div>
        ) : (
          <p>Stream não disponível</p>
        )}
      
      
    </div>
  );
};

export default ArchiveStream;
