import React, { useState, useEffect } from 'react';
import { Drawer, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent } from '@mui/material';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { sendMessage } from '../../services/api';
import './ConnectionPanel.css';
import { Autocomplete } from '@mui/material';

const ConnectionPanel = ({ server, topic, uuid }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [savedHeaderKeys, setSavedHeaderKeys] = useState([]);

  const [openReceivedMessageDialog, setOpenReceivedMessageDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleOpenReceivedMessageDialog = (message) => {
    setSelectedMessage(message);
    setOpenReceivedMessageDialog(true);
  };

  const handleCloseReceivedMessageDialog = () => {
    setOpenReceivedMessageDialog(false);
    setSelectedMessage(null);
  };

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('headerKeys')) || [];
  setSavedHeaderKeys(stored);

  const socket = new SockJS('http://localhost:8080/kafka-ui');
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    const subscription = stompClient.subscribe(`/topic/${uuid}`, (message) => {
      console.log('Received message:', message);
      const newMessage = { time: new Date(), body: JSON.parse(message.body) };
      setMessages((prev) => [...prev, newMessage]);
    });

    // Очистка при размонтировании
    return () => {
      subscription.unsubscribe();
      stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    };
  });
}, [uuid]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (index, type, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][type] = value;
    setHeaders(updatedHeaders);
  };

  const handleSendMessage = () => {
    const keysToSave = headers
      .map(h => h.key)
      .filter(k => k && k.trim() !== '');

    if (keysToSave.length > 0) {
      const stored = JSON.parse(localStorage.getItem('headerKeys')) || [];

      const updated = [
        ...new Set([...keysToSave, ...stored])
      ].slice(0, 10);

      localStorage.setItem('headerKeys', JSON.stringify(updated));
      setSavedHeaderKeys(updated);
    }
    sendMessage({topicId: uuid, message: inputMessage, headers: headers.reduce((acc, item) => {
                                                                  acc[item.key] = item.value;
                                                                  return acc;
                                                                }, {})})
  };

  const getDisplayedMessage = (msg) => {
    const jsonString = JSON.stringify(msg.body);
    console.log(jsonString.substring(0, 150) + (jsonString.length > 150? '...' : ''));
    return jsonString.substring(0, 150) + (jsonString.length > 150? '...' : '');
  };


  return (
        <Drawer anchor="right" open={!!server} variant="persistent" PaperProps={{style: {height: 'calc(100vh - 90px)', top: '90px', left: '250px'}}}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ flexGrow: 1, display: 'flex' }}>
            <div style={{ width: '40%', padding: '20px' }}>
              <h3 className="panel-header">Send message</h3>
              <div style={{top: '50px', display: 'flex', flexDirection: 'column'}}>
                <TextField
                  label="Enter Message"
                  InputProps={{
                    style: {
                      height: '200px'
                    },
                  }}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  multiline
                  rows={8}
                  fullWidth autoComplete="off"
                  />
                <h3 style={{ alignSelf: 'flex-start' }}>Headers (Key / Value)</h3>
                <div className="headers">
                {headers.map((header, index) => (
                  <div className="header" key={index} style={{ display: 'flex', marginBottom: '8px' }}>
                    <Autocomplete
                      freeSolo
                      options={savedHeaderKeys}
                      disableClearable
                      value={header.key}
                      onInputChange={(event, newValue) =>
                        handleHeaderChange(index, 'key', newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Header Key"
                          InputProps={{
                            ...params.InputProps,
                            style: { height: '25px', marginRight: '1px' }
                          }}
                          autoComplete="off"
                        />
                      )}
                      sx={{ width: 150, marginRight: '4px' }}
                    />
                    <TextField
                      value={header.value}
                      onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                      InputProps={{ style: { height: '25px' } }}
                      placeholder="Header Value" autoComplete="off"
                    />
                  </div>
                ))}
              </div>

              <Button variant="text" onClick={addHeader} style={{fontSize: '20px', lineHeight: '10px', alignSelf: 'flex-start', padding: '10px 20px', minWidth: 'unset'}}>+</Button>
              <Button
                variant="contained"
                className="send-button"
                onClick={handleSendMessage}
                fullWidth
              >
                Send
              </Button>
              </div>
            </div>

            <div style={{ width: '60%', padding: '20px' }}>
              <h3 className="panel-header">Received messages</h3>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messages.map((msg, index) => (
                    <TableRow key={index} onClick={() => handleOpenReceivedMessageDialog(msg.body)} className="clickable-row">
                      <TableCell>{msg.time.toLocaleString('ru-RU')}</TableCell>
                      <TableCell>{getDisplayedMessage(msg)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <Dialog open={openReceivedMessageDialog} onClose={handleCloseReceivedMessageDialog} maxWidth="md" fullWidth>
            <DialogTitle>Full Message</DialogTitle>
              <DialogContent>
                <pre>{JSON.stringify(selectedMessage, null, 2)}</pre>
            </DialogContent>
          </Dialog>
         </div>
        </Drawer>

  );
};

export default ConnectionPanel;
