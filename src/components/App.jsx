import {BrowserRouter, Routes, Route} from "react-router-dom";
import Server from "./server/Server";
import Camera from "./camera/Camera";
import Cameras from "./cameras/Cameras";
import EventSimulation from "./event/Event";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Server />} />
        <Route path="/cameras/:serverName" element={<Cameras />} />
        <Route path="/camera/:accessPoint" element={<Camera />} />
        <Route path="/event" element={<EventSimulation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;