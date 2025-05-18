import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Notification } from './components/ui/Notification';
import { Home } from './components/Home';
import { TripDetails } from './components/trips/TripDetails';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Notification />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trips/:tripId" element={<TripDetails />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;

