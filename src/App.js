import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#6B8E23', marginBottom: 2, fontFamily: 'Trebuchet MS' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: '600', fontFamily: 'Trebuchet MS' }}>
            Contact Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
