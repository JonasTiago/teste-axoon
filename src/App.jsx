import {BrowserRouter, Routes, Route} from "react-router-dom";
import Server from "./pages/server/Server";
import Camera from "./pages/camera/Camera";
// import Cameras from "./cameras/Cameras";
import EventSimulation from "./pages/event/Event";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Server />} />
        {/* <Route path="/cameras/:serverName" element={<Cameras />} /> */}
        <Route path="/camera/:accessPoint" element={<Camera />} />
        <Route path="/event" element={<EventSimulation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;