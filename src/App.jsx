import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Home } from './components/Home';
import { TripDetails } from './components/trips/TripDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips/:tripId" element={<TripDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

