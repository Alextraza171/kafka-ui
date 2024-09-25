import React from 'react';
import './CreateConnectionDialog.css';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const CreateConnectionDialog = ({ open, onClose }) => {

  const handleClickSaveButton = () => {
    console.log('Save button clicked');
  };

  return (
    <div className="edit-dialog">
      <Dialog id="createConnectionDialog" open={open} onClose={onClose} className="kafka-ui">
        <DialogTitle>Connection configuration</DialogTitle>
          <DialogContent>
            <DialogContentText>
                  Tratata
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClickSaveButton}>Save</Button>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateConnectionDialog;