import React from 'react';
import './EventDetails.css';
import Img from '../../camera/Img'

const EventDetails = ({ event }) => {
  return (
    <div className="event-details">
      <div>
        <h1>Event</h1>
        <div className='event-image'> 
        <Img 
          videosourceid={event.source.replace("hosts/", "")} 
          event={event}
          w={600}
          h={400}/>
        </div>
        
      </div>     
      
      <div className="event-info">
        <h2>{event.type}</h2>
        <p><strong>Estado do Alerta:</strong> {event.alertState}</p>
        <p><strong>ID:</strong> {event.id}</p>
        <p><strong>Multi-Phase Sync ID:</strong> {event.multiPhaseSyncId}</p>
        <p><strong>Origem:</strong> {event.origin}</p>
        <p><strong>Fonte:</strong> {event.source}</p>
        <p><strong>Timestamp:</strong> {event.timestamp}</p>
      </div>
    </div>
  );
};

export default EventDetails;
