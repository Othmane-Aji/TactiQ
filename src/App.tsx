import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import Performances from './pages/Performances';
import Matches from './pages/Matches';
import Statistics from './pages/Statistics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import SalaryPrediction from './pages/SalaryPrediction';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="players" element={<Players />} />
          <Route path="performances" element={<Performances />} />
          <Route path="matches" element={<Matches />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="SalaryPrediction" element={<SalaryPrediction />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;