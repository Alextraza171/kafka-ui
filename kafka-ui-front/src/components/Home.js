import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './Home.css';
import TestConnectionDialog from './TestConnectionDialog';

const Home = ({ onOpenDialog }) => {
  const [open, setOpen] = useState(false);

  const handleCloseCreateConnectionDialog = () => {
    setOpen(false);
  };

  const handleClickTestConnectionButton = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="home">
          <Button variant="outlined" onClick={onOpenDialog}>New connection</Button>
          <Button variant="outlined" onClick={handleClickTestConnectionButton}>Test connection</Button>
      </div>
      <div className="outer-area">
          <TestConnectionDialog open={open} onClose={handleCloseCreateConnectionDialog}/>
      </div>
    </>
  );
};

export default Home;