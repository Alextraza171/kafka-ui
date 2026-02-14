import React, { useState, useEffect } from 'react';
import './CreateConnectionDialog.css';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField, Autocomplete } from '@mui/material';
import { connectToTopic, getTopics } from '../../services/api';
import { v4 as uuidv4 } from 'uuid';

const CreateConnectionDialog = ({ open, onClose, onSuccess }) => {

  const [serverAddress, setServerAddress] = useState('');
  const [topic, setTopic] = useState('');
  const [availableTopics, setAvailableTopics] = useState([]);
  const [serverAddressError, setServerAddressError] = useState(false);
  const [savedServers, setSavedServers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('serverAddresses')) || [];
    setSavedServers(stored);
  }, [open]);

  const handleClickConnectButton = () => {
    const uuid = uuidv4();
    connectToTopic({bootstrapServer: serverAddress, topic, topicId: uuid}).then(rs => {
        if (rs.status === 200) {
           const stored = JSON.parse(localStorage.getItem('serverAddresses')) || [];
           const updated = [serverAddress, ...stored.filter(a => a !== serverAddress)].slice(0, 5);
           localStorage.setItem('serverAddresses', JSON.stringify(updated));

           onSuccess(serverAddress, topic, uuid);
           onClose();
        }
    })
  };

  const handleLoadTopics = () => {
    if (!serverAddress) {
      setServerAddressError(true);
      return;
    }

    setServerAddressError(false);
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
            <Autocomplete
              freeSolo
              disableClearable
              options={savedServers}
              value={serverAddress}
              onInputChange={(event, newValue) => setServerAddress(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  margin="dense"
                  label="Server address"
                  variant="outlined"
                  fullWidth
                  error={serverAddressError}
                  helperText={serverAddressError ? 'Server address is required' : ''}
                />
              )}
            />

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