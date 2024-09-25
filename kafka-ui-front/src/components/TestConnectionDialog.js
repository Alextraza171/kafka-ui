import React, { useState } from 'react';
import './TestConnectionDialog.css';
import { Dialog, DialogActions, DialogContent, Button, TextField } from '@mui/material';
import { testConnection } from '../services/api';
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toastConfig} from '../services/util'

const TestConnectionDialog = ({ open, onClose }) => {

  const [loading, setLoading] = useState(false);

  const handleClickTestButton = () => {
    setLoading(true);
    testConnection(serverAddress).then(res => {
       res.data? toast.success('Connection successful!', { className: 'toast-success' }) : toast.error('Connection failed!', { className: 'toast-error' });
    }).catch(err => {
        toast.error('Connection failed!', { className: 'toast-error' });
     }).finally(() => setLoading(false));
  };

  const [serverAddress, setServerAddress] = useState('');

  return (
    <div className="edit-dialog">
      <Dialog id="testConnectionDialog" open={open} onClose={onClose} className="kafka-ui">
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="Server address" type="text"
           fullWidth variant="outlined" value={serverAddress} onChange={(e) => setServerAddress(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickTestButton}>Test connection</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
        {loading && (
                <div className="spinner-overlay">
                  <ClipLoader color="#36d7b7" size={50} />
                </div>
         )}
        <ToastContainer {...toastConfig}/>
      </Dialog>
    </div>
  );
};

export default TestConnectionDialog;