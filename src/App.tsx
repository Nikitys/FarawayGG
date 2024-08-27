import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
