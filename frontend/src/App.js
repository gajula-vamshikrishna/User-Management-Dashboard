import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/:id/edit" element={<UserForm />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
