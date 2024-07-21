import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Budget from './components/Budget';
import Reports from './components/Reports';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'; // Impor komponen Home
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <main className="p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/transactions" element={<TransactionList />} />
              <Route path="/add-transaction" element={<TransactionForm />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/" element={<Home />} /> {/* Tambahkan Route untuk Home */}
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
