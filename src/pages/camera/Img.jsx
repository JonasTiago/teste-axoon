import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACK_END_URL;

const Img = ({videosourceid, event, w=120, h=80 }) => {
  const [snapshotUrl, setSnapshotUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    

    fetchSnapshot();

    // Cleanup: Revoke Object URL quando o componente for desmontado
    
  }, [videosourceid]);

  const fetchSnapshot = async () => {
    const url = `${API_URL}/archive/media/${videosourceid}/${event.timestamp}?w=${w}&h=${h}`;


    try {
      const response = await axios.get(url, {
        auth: {
          username: "root",
          password: "Big4dev2024"
        },
        responseType: 'blob',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache"
        }
      });

      const objectUrl = URL.createObjectURL(response.data);
      setSnapshotUrl(objectUrl);
      return () => {
        if (snapshotUrl) {
          URL.revokeObjectURL(snapshotUrl);
        }
      };
    } catch (error) {
      console.error("Erro ao buscar snapshot:", error);
      alert("Erro ao carregar o snapshot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="snapshot-container">
      {loading ? (
        <p>Carregando imagem...</p>
      ) : (
        snapshotUrl && <img src={snapshotUrl} alt={`Snapshot da câmera ${''}`} />
      )}
    </div>
  );
};

export default Img;
