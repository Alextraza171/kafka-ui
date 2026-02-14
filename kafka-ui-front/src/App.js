import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Header from './components/header/Header';
import MainArea from './components/mainArea/MainArea';
import ServerHealthChecker from "./components/serverHealthChecker/ServerHealthChecker";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';

import './styles/App.css';
import './styles/global.css';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#d599bc'
      },
    },
  });

  const isCurrentlyOffline = useRef(false);

  useEffect(() => {
    const offlineHandler = () => {
      if (!isCurrentlyOffline.current) {
        isCurrentlyOffline.current = true;

        toast.error('Cannot connect to server', {
          containerId: 'server-status',
          toastId: 'server-offline',
        });
      }
    };

    const onlineHandler = () => {
      if (isCurrentlyOffline.current) {
        isCurrentlyOffline.current = false;

        toast.update('server-offline', {
          containerId: 'server-status',
          render: 'Connection restored',
          type: 'success',
          autoClose: 2000,
        });
      }
    };

    window.addEventListener('server:offline', offlineHandler);
    window.addEventListener('server:online', onlineHandler);

    return () => {
      window.removeEventListener('server:offline', offlineHandler);
      window.removeEventListener('server:online', onlineHandler);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', theme.palette.primary.main);
  }, [theme]);

  return (
  <Router>
    <ThemeProvider theme={theme}>
      <ServerHealthChecker />
      <div className="kafka-ui">
        <Header />
        <MainArea />
      </div>
      <ToastContainer
             containerId="server-status"
             position="top-center"
             autoClose={false}
             closeOnClick={false}
             draggable={false}
             closeButton={false}
             hideProgressBar={true}
             newestOnTop={false}/>
    </ThemeProvider>
  </Router>
  );
}

export default App;
