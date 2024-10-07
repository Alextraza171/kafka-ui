import React, { useState, useEffect } from 'react';
import Home from '../components/Home';
import ConnectionPanel from '../components/ConnectionPanel';
import { getActiveConnections } from '../services/api';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LeftPanel from '../components/LeftPanel';
import CreateConnectionDialog from '../components/CreateConnectionDialog';

const MainArea = () => {
  const [activeServer, setActiveServer] = useState(undefined);
  const [activeTopic, setActiveTopic] = useState(undefined);
  const [activeUuid, setActiveUuid] = useState(undefined);

  const [connections, setConnections] = useState([]);
  const [isCreateConnectionDialogOpen, setIsCreateConnectionDialogOpen] = useState(false);

  const handleClickOpenCreateConnectionDialog = () => {
    setIsCreateConnectionDialogOpen(true);
  }

  const handleCloseCreateConnectionDialog = () => {
    setIsCreateConnectionDialogOpen(false);
  };

  useEffect(() => {
      getActiveConnections().then(rs => {
        const connections = rs.data.map(el => ({server: el.bootstrapServer, uuid: el.topicId, topic: el.topic}));
        setConnections(connections);
    })
  }, []);

  const handleNewConnection = (server, topic, uuid) => {
     setConnections((prev) => [...prev, { server, topic, uuid }]);
     openConnectionPanel(server, topic, uuid);
  };

  const navigate = useNavigate();
  const openConnectionPanel = (server, topic, uuid) => {
    setActiveServer(server);
    setActiveTopic(topic);
    setActiveUuid(uuid);
    navigate('/connection-panel');
  };

  return (
    <>
     <div className="body-container">
       <LeftPanel onOpenDialog={handleClickOpenCreateConnectionDialog} connections={connections} onConnectionClick={openConnectionPanel}/>
         <div className="main-content">
           <Routes>
             <Route path="/" element={<Home onOpenDialog={handleClickOpenCreateConnectionDialog} />} />
             <Route path="/connection-panel" element={<ConnectionPanel server={activeServer} topic={activeTopic} uuid={activeUuid}/>} />
           </Routes>
         </div>
     </div>
      <div className="outer-area">
        <CreateConnectionDialog open={isCreateConnectionDialogOpen} onClose={handleCloseCreateConnectionDialog} onSuccess={handleNewConnection}/>
      </div>
    </>
  );
}

export default MainArea;
