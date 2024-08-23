import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import webSocket from "../../WebSocket/WebSocket.ts";
import './style.css';
import Snapshot from "../../components/snapshot/Snapshot";

const API_URL = process.env.REACT_APP_BACK_END_URL;

export default function Server() {
  const [servers, setServers] = useState([]);
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    webSocket();
    addNewName();
    fetchCameras()
  }, [])
  
  async function addNewName() {

    try {
      const response = await axios.get(`${API_URL}/hosts`, {
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

      setServers(response.data);

    } catch (error) {
      console.log(error);
      alert("Erro!");
    }
  }
 
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
      <div className="server-list">
        <h2>Active Servers</h2>
        <ul>
          {servers.map(server => (
            <li key={server.id}>
                {server}
              <br />
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
            ): "Não há nomes Cameras..." }
            </li>
          ))}
        </ul>
      </div>
    );
}
