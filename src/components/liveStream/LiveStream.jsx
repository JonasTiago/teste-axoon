import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_BACK_END_URL;


const ArchiveStream = ({ url }) => {
  const [cameraUrl, setCameraUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [targetOrigin, setTargetOrigin] = useState('*');
  const [error, setError] = useState(null); // Track potential errors

  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
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
          const fullUrl = API_URL + response.data.path;
          setCameraUrl(fullUrl);

          // Extracting the origin of the URL
          const urlObject = new URL(fullUrl);
          setTargetOrigin(urlObject.origin);
        } else {
          throw new Error('Não foi possível acessar o stream.');
        }
      } catch (error) {
        console.error('Erro ao buscar o stream da câmera:', error);
        setError(error); // Store error for display
      } finally {
        setLoading(false);
      }
    };

    fetchStreamUrl();
  }, [url]);

  // Function for sending messages to the iframe (consider error handling)
  const sendMessage = (message) => {
    try {
      const iframe = document.getElementById('videoIframe');
      iframe.contentWindow.postMessage(message, targetOrigin);
    } catch (error) {
      console.error('Error sending message to iframe:', error);
    }
  };

  // Implement video control functions with error handling
  const playVideo = () => {
    if (cameraUrl) { // Check if cameraUrl is available before sending message
      sendMessage({ type: 'play' });
    } else {
      setError(new Error('Stream URL unavailable.'));
    }
  };

  const stopVideo = () => {
    if (cameraUrl) {
      sendMessage({ type: 'stop' });
    } else {
      setError(new Error('Stream URL unavailable.'));
    }
  };

  return (
    <div className="archive-stream-container">
      {loading ? (
        <p>Carregando stream da câmera...</p>
      ) : (
        cameraUrl.length > 0 ? (
          <div>
            <iframe
              src={cameraUrl}
              width="800px"
              height="600px"
              id="videoIframe"
              title="Archive Camera Stream"
            >
              Stream não disponível
            </iframe>
            <div className="controls">
              <button onClick={playVideo}>Play</button>
              <button onClick={stopVideo}>Pause</button>
            </div>
          </div>
        ) : (
          <p>Stream não disponível</p>
        )
      )}
      {error && <p>Erro: {error.message}</p>} {/* Display error message if present */}
    </div>
  );
};

export default ArchiveStream;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_BACK_END_URL;

// const LiveStream = ({ url }) => {
//   const [cameraUrl, setCameraUrl] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchStreamUrl = async () => {

//       try {
//         const response = await axios.get(`${API_URL}${url}`, {
//           auth: {
//             username: "root",
//             password: "Big4dev2024"
//           },
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Cache-Control": "no-cache"
//           }
//         });

//         console.log("response", response);

//         if (response.status === 200) {
//           setCameraUrl(API_URL+response.data.path);
//         } else {
//           throw new Error('Não foi possível acessar o stream.');
//         }
//       } catch (error) {
//         console.error("Erro ao buscar o stream da câmera:", error);
//         alert("Erro ao carregar o stream da câmera");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStreamUrl();
//   }, [url]);

//   const sendMessage = (message) => {
//     const iframe = document.getElementById('videoIframe');
//     iframe.contentWindow.postMessage(message, "*");
//   };

//   // Exemplos de comandos que podem ser enviados
//   const playVideo = () => {
//     sendMessage({
//       type: 'play'
//     });
//   };

//   const stopVideo = () => {
//     sendMessage({
//       type: 'play'
//     });
//   };

//   return (
//     <div className="livestream-container">
//       {loading ? 
//         <p>Carregando stream da câmera...</p>
//        : 
//        <>
//        <iframe 
//             src={cameraUrl}
//             width="800px" height="600px" 
//             id="videoIframe"
//             title={`Camera Stream`}
//           >
//             Stream não disponível
//           </iframe>
//           <div className="controls">
//             <button onClick={playVideo}>Play</button>
//             <button onClick={stopVideo}>Stop</button>
//             {/* <button onClick={goToArchiveMode}>Go to Archive</button>
//             <button onClick={goToLiveMode}>Go to Live</button>
//             <button onClick={startPlayback}>Start Playback</button>
//             <button onClick={setArchiveTime}>Set Archive Time</button>
//             <button onClick={changeCamera}>Change Camera</button> */}
//           </div>
//        </>
          
//       }
      
//     </div>
//   );
// };

// export default LiveStream;
