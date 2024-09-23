import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const API_URL = process.env.REACT_APP_BACK_END_URL;

export default function Server() {
  const [servers, setServers] = useState([]);
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    getServers();
  }, []);

  console.log("eventPage");
  async function getServers() {
    try {
      const response = await axios.get(`${API_URL}/servers`);
      setServers(response.data);
      getCameras(response.data);
    } catch (error) {
      console.log("Erro no servidor!", error);
    }
  }

  async function getCameras(server) {
    try {
      const { data } = await axios.get(
        `${API_URL}/cameras?server=${server[0]}`
      );
      setCameras(data.cameras);
    } catch (error) {
      console.log("Erro! Não foi possível buscar os cameras!", error);
    }
  }

  return (
    <div>
      <ul className="server-list">
        <h1>Servidores Ativos</h1>
        {servers.map((server, i) => (
          <li key={i}>
            <h3>{server}</h3>
            <br />
            {cameras.length > 0 ? (
              <ul className="camera-list">
                {cameras.map((camera, i) => (
                  <Link
                    key={i}
                    to={`/camera/${camera.displayName}`}
                    state={camera.accessPoint.replace("hosts/", "")}
                  >
                    <li className="camera-item">
                      <span>{camera.displayName}</span>
                      <br />
                      <img
                        src={`${API_URL}/cameras/snapshot?videoSourceid=${camera.accessPoint.replace(
                          "hosts/",
                          ""
                        )}`}
                        alt={`Snapshot da câmera`}
                      />
                    </li>
                  </Link>
                ))}
              </ul>
            ) : (
              "Não há nomes Cameras..."
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
