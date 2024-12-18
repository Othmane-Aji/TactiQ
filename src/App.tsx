import React, { useState } from 'react'; 
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

/*// Simuler l'état d'authentification (à remplacer par un contexte ou une logique réelle)
const isAuthenticated = false; // Modifier cette variable selon l'état d'authentification

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="players" element={<Players />} />
          <Route path="performances" element={<Performances />} />
          <Route path="matches" element={<Matches />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;*/

/******************************************************************************************************************** */



/*const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Route vers le login *//*}
        <Route
          path="/"
          element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Route vers le dashboard (protégée) *//*}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;*/

/*import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import Dashboard from './Dashboard';*/

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log('Is Authenticated:', isAuthenticated); // Vérifie l'état d'authentification

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
        <Route path="players" element={<Players />} />
        <Route path="performances" element={<Performances />} />
        <Route path="matches" element={<Matches />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />

      </Routes>
    </Router>
  );
};

export default App;





