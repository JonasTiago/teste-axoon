import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import webSocket from "../../WebSocket/WebSocket.ts";
import './style.css';

export default function Server() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    webSocket();
    addNewName();
  }, [])
  async function addNewName() {
    const API_URL = process.env.REACT_APP_BACK_END_URL;

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
  
  return <>
    <div className="server-list">
      <h2>Active Servers</h2>
      <ul>
        {servers.map(server => (
          <li key={server.id}>
            <Link to={`/cameras/${server}`}>
              {server}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </>
}
