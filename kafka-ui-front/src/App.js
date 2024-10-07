import './App.css';
import React, { useEffect } from 'react';
import './global.css';
import Header from './components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import MainArea from './components/MainArea';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#d599bc'
      },
    },
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', theme.palette.primary.main);
  }, [theme]);

  return (
  <Router>
    <ThemeProvider theme={theme}>
      <div className="kafka-ui">
        <Header />
        <MainArea/>
      </div>
    </ThemeProvider>
  </Router>
  );
}

export default App;
