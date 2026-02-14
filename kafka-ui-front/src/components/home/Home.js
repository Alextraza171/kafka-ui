import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './Home.css';
import TestConnectionDialog from '../testConnectionDialog/TestConnectionDialog';
import CreateTopicDialog from '../createTopicDialog/CreateTopicDialog';

const Home = ({ onOpenDialog }) => {
  const [openTestConnectionDialog, setOpenTestConnectionDialog] = useState(false);
  const [openCreateTopicDialog, setOpenCreateTopicDialog] = useState(false);

  const handleCloseTestConnectionDialog = () => {
    setOpenTestConnectionDialog(false);
  };

  const handleCloseCreateTopicDialog = () => {
    setOpenCreateTopicDialog(false);
  };

  const handleClickTestConnectionButton = () => {
    setOpenTestConnectionDialog(true);
  };

  const handleClickCreateTopicButton = () => {
    setOpenCreateTopicDialog(true);
  };

  return (
    <>
      <div className="home">
          <Button variant="outlined" onClick={onOpenDialog}>New connection</Button>
          <Button variant="outlined" onClick={handleClickTestConnectionButton}>Test connection</Button>
          <Button variant="outlined" onClick={handleClickCreateTopicButton}>Create topic</Button>
      </div>
      <div className="outer-area">
          <TestConnectionDialog open={openTestConnectionDialog} onClose={handleCloseTestConnectionDialog}/>
          <CreateTopicDialog open={openCreateTopicDialog} onClose={handleCloseCreateTopicDialog}/>
      </div>
    </>
  );
};

export default Home;