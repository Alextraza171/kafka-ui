import React from 'react';
import Button from '@mui/material/Button';
import './LeftPanel.css';

const LeftPanel = ({ onOpenDialog }) => {

  return (
    <div className="left-panel">
        <header className="lp-header">Active servers</header>
        <Button variant="text" onClick={onOpenDialog}>+</Button>
    </div>
  );
};

export default LeftPanel;