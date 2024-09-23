import React from "react";

const API_URL = process.env.REACT_APP_BACK_END_URL;

const ArchiveStream = (videosourceid) => {
  // const [cameraUrl, setCameraUrl] = useState("");
  // Function for sending messages to the iframe (consider error handling)

  return (
    <div className="archive-stream-container">
      {videosourceid ? (
        <div>
          {/* <video
            src={`${API_URL}/cameras/live?videoSourceid=${videosourceid.videosourceid}`}
            autoPlay
            controls
          ></video> */}
          {/* <iframe
            src={`${API_URL}/cameras/live?videoSourceid=${videosourceid.videosourceid}`}
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
