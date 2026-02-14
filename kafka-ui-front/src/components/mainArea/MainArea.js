import React, { useState, useEffect } from 'react';
import Home from '../home/Home';
import ConnectionPanel from '../connectionPanel/ConnectionPanel';
import { getActiveConnections } from '../../services/api';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LeftPanel from '../leftPanel/LeftPanel';
import CreateConnectionDialog from '../createConnectionDialog/CreateConnectionDialog';

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
    const loadConnections = async () => {
      try {
        const rs = await getActiveConnections();

        const connections = rs.data.map(el => ({
          server: el.bootstrapServer,
          uuid: el.topicId,
          topic: el.topic
        }));

        setConnections(connections);
      } catch (e) {
        // Ничего не делаем
        // interceptor уже показал popup
      }
    };

  loadConnections();
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
             <Route path="/" element={<Home onOpenDialog={handleClickOpenCreateConnectionDialog} />}/>
             <Route path="/connection-panel" element={<ConnectionPanel server={activeServer} topic={activeTopic} uuid={activeUuid} />}
                    key={`${activeServer}-${activeTopic}-${activeUuid}`}
             />
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
