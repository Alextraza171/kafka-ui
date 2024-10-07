import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, Button, TextField, DialogTitle } from '@mui/material';
import { createTopic } from '../services/api';
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toastConfig} from '../services/util'

const CreateTopicDialog = ({ open, onClose }) => {

  const [loading, setLoading] = useState(false);

  const handleClickCreateButton = () => {
    setLoading(true);
    createTopic({bootstrapServer: serverAddress, topic, partitionsNumber, replicasNumber}).then(res => {
       res.data? toast.success('Connection successful!', { className: 'toast-success' }) : toast.error('Connection failed!', { className: 'toast-error' });
    }).catch(err => {
        toast.error('Connection failed!', { className: 'toast-error' });
     }).finally(() => setLoading(false));
  };

  const [serverAddress, setServerAddress] = useState('');
  const [topic, setTopic] = useState('');
  const [partitionsNumber, setPartitionsNumber] = useState('');
  const [replicasNumber, setReplicasNumber] = useState('');

  return (
      <Dialog id="testConnectionDialog" open={open} onClose={onClose} className="kafka-ui edit-dialog" PaperProps={{style: { width: '500px',maxWidth: 'unset'}}}>
        <DialogTitle>Create topic</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="Server address" type="text" autoComplete="off"
           fullWidth variant="outlined" value={serverAddress} onChange={(e) => setServerAddress(e.target.value)}/>
          <TextField autoFocus margin="dense" id="name" label="Topic" type="text" autoComplete="off"
           fullWidth variant="outlined" value={topic} onChange={(e) => setTopic(e.target.value)}/>
          <TextField autoFocus margin="dense" id="name" label="Partitions number" type="text" autoComplete="off"
           fullWidth variant="outlined" value={partitionsNumber} onChange={(e) => setPartitionsNumber(e.target.value)}/>
          <TextField autoFocus margin="dense" id="name" label="Replicas number" type="text" autoComplete="off"
           fullWidth variant="outlined" value={replicasNumber} onChange={(e) => setReplicasNumber(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCreateButton}>Create</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
        {loading && (
                <div className="spinner-overlay">
                  <ClipLoader color="#36d7b7" size={50} />
                </div>
         )}
        <ToastContainer {...toastConfig}/>
      </Dialog>
  );
};

export default CreateTopicDialog;