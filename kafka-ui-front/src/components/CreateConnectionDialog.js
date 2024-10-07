import React, { useState } from 'react';
import './CreateConnectionDialog.css';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField, Autocomplete } from '@mui/material';
import { connectToTopic, getTopics } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

const CreateConnectionDialog = ({ open, onClose, onSuccess }) => {

  const [serverAddress, setServerAddress] = useState('');
  const [topic, setTopic] = useState('');
  const [availableTopics, setAvailableTopics] = useState([]);

  const handleClickConnectButton = () => {
    const uuid = uuidv4();
    connectToTopic({bootstrapServer: serverAddress, topic, topicId: uuid}).then(rs => {
        if (rs.status === 200) {
           onSuccess(serverAddress, topic, uuid);
           onClose();
        }
    })
  };

  const handleLoadTopics = () => {
    getTopics(serverAddress).then(rs => {
      setAvailableTopics(rs.data);
    });
  };

  const displayDropdown = () => {
    console.log(availableTopics.length)
    return availableTopics.length > 0;
  }

  return (
      <Dialog id="createConnectionDialog" open={open} onClose={onClose} PaperProps={{style: {width: '500px', maxWidth: 'unset'}}} className="kafka-ui edit-dialog">
        <DialogTitle>Connection configuration</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="name" label="Server address" type="text" autoComplete="off"
            fullWidth variant="outlined" value={serverAddress} onChange={(e) => setServerAddress(e.target.value)}/>

            {displayDropdown() ? (<Autocomplete options={availableTopics} value={topic}
              onChange={(event, newValue) => setTopic(newValue)} renderInput={(params) => <TextField {...params}
              label="Topic" fullWidth variant="outlined" />} fullWidth/>) :
              (<TextField autoFocus margin="dense" id="name" label="Topic" type="text" autoComplete="off"
                                              fullWidth variant="outlined" value={topic} onChange={(e) => setTopic(e.target.value)}/>)}
              <Button variant="outlined"
                      onClick={handleLoadTopics}
                      style={{ border: 'none' }}>
                      Load Topics
              </Button>
           </DialogContent>
           <DialogActions>
           <Button onClick={handleClickConnectButton}>Connect</Button>
           <Button onClick={onClose}>Close</Button>
          </DialogActions>
      </Dialog>
  );
};

export default CreateConnectionDialog;