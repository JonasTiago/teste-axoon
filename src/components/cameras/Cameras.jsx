import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Snapshot from "../snapshot/Snapshot.jsx";
import './style.css';

export default function Cameras() {
  const [cameras, setCameras] = useState([]);
  const { serverName } = useParams();

  useEffect(() => {
    fetchCameras();
  }, [])

  const API_URL = process.env.REACT_APP_BACK_END_URL;
  async function fetchCameras() {
    try {
      const {data} = await axios.get(`${API_URL}/camera/list`,{
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
      setCameras(data.cameras);
    } catch (error) {
      console.log(error);
      alert("Erro! Não foi possível buscar os nomes!");
    }
  }

  return (
    <div className="camera-list">
      <h2>Cameras in Server {serverName}</h2>
      {cameras.length > 0 ? (
      <ul>
        {cameras.map((camera,i) => 
        <Link to={`/camera/${camera.displayName}`} 
              state={camera.accessPoint.replace("hosts/", "")} 
              key={i} >
          <li >
              <span>
                  {camera.displayName}
              </span>
            <br />
            <Snapshot camera={camera} />
          </li>
        </Link>
      )}
      </ul>
    ): "Não há nomes registrados..." }
    </div>
  );
}


