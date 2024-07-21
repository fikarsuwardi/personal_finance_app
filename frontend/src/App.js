import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

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
            <Route path="/" element={<TransactionList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
