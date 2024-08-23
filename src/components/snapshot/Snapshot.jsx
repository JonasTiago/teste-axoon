import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACK_END_URL;

const Snapshot = ({ camera }) => {
  const [snapshotUrl, setSnapshotUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    

    fetchSnapshot();

    // Cleanup: Revoke Object URL quando o componente for desmontado
    
  }, []);

  const fetchSnapshot = async () => {
    const cameraPath = camera.accessPoint.replace("hosts/", "");
    const url = `${API_URL}/live/media/snapshot/${cameraPath}?w=300&h=150`;

    try {
      const response = await axios.get(url, {
        auth: {
          username: "root",
          password: "Big4dev2024"
        },
        responseType: 'blob', // Recebe a imagem como um Blob
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
        <p>Carregando snapshot...</p>
      ) : (
        snapshotUrl && <img src={snapshotUrl} alt={`Snapshot da câmera ${camera.displayName}`} />
      )}
    </div>
  );
};

export default Snapshot;
