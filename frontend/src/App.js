import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Budget from './components/Budget';
import Report from './components/Reports';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="pt-16 md:ml-64 p-4">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-transaction" element={<TransactionForm />} />
            <Route path="/transactions" element={<TransactionList />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
