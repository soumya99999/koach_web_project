import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserList from './components/UserList';
import './styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <h1>User Dashboard</h1>
        <Routes>
          <Route path="/users/:userId" element={<Dashboard />} />
          <Route path="/" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;