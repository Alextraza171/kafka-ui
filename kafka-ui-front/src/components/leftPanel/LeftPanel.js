import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './LeftPanel.css';

const LeftPanel = ({ onOpenDialog, connections, onConnectionClick }) => {

  const [activeConnection, setActiveConnection] = useState(null);

   const handleConnectionClick = (server, topic, uuid) => {
      setActiveConnection(uuid);
      onConnectionClick(server, topic, uuid);
   };

  return (
    <div className="left-panel">
        <header className="lp-header">Active connections</header>
        <Button variant="text" onClick={onOpenDialog}>+</Button>
        {connections.map((item, index) => (
                <Button
                  key={index}
                  variant='contained'
                  className={activeConnection === item.uuid ? 'connection-button active' : "connection-button"}
                  onClick={() => handleConnectionClick(item.server, item.topic, item.uuid)}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      {item.topic}
                    </div>
                    <div style={{ fontSize: '12px', color: '#777' }}>
                      {item.server}
                    </div>
                   </div>
                </Button>
        ))}
    </div>
  );
};

export default LeftPanel;