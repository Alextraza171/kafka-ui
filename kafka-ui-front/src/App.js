import './App.css';
import React, { useState } from 'react';
import './global.css';
import Header from './components/Header';
import Home from './components/Home';
import LeftPanel from './components/LeftPanel';
import CreateConnectionDialog from './components/CreateConnectionDialog';

function App() {
  const [open, setOpen] = useState(false);

  const handleClickOpenCreateConnectionDialog = () => {
    setOpen(true);
  };

  const handleCloseCreateConnectionDialog = () => {
    setOpen(false);
  };

  return (
    <div className="kafka-ui">
      <Header />
      <div className="body-container">
        <LeftPanel onOpenDialog={handleClickOpenCreateConnectionDialog}/>
        <Home onOpenDialog={handleClickOpenCreateConnectionDialog}/>
      </div>
      <div className="outer-area">
        <CreateConnectionDialog open={open} onClose={handleCloseCreateConnectionDialog}/>
      </div>
    </div>
  );
}

export default App;
