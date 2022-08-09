// import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard  from './components/Dashboard';
import InfoPage from './components/InfoPage';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Navigate to="/dashboard" />}/>
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/info" element={<InfoPage />} />
     </Routes>
  );
};

export default App;
