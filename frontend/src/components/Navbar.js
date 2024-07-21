import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/user/userSlice';
import { resetTransactionsState } from '../features/transactions/transactionsSlice';
import { resetBudgetsState } from '../features/budgets/budgetSlice';
import { resetReportState } from '../features/reports/reportSlice';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetTransactionsState());
    dispatch(resetBudgetsState());
    dispatch(resetReportState());
    Swal.fire({
      icon: 'success',
      title: 'Logout Successful',
      text: 'You have successfully logged out!',
    });
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="h-screen w-64 bg-blue-600 text-white fixed flex flex-col hidden md:flex">
        <h1 className="text-2xl font-bold p-4">Personal Finance App</h1>
        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/" className="hover:bg-blue-700 p-2 rounded">Home</Link>
          <Link to="/transactions" className="hover:bg-blue-700 p-2 rounded">Transactions</Link>
          <Link to="/add-transaction" className="hover:bg-blue-700 p-2 rounded">Add Transaction</Link>
          <Link to="/budget" className="hover:bg-blue-700 p-2 rounded">Budget</Link>
          <Link to="/reports" className="hover:bg-blue-700 p-2 rounded">Reports</Link>
          {userInfo ? (
            <button onClick={handleLogout} className="hover:bg-blue-700 p-2 rounded text-left">Logout</button>
          ) : (
            <>
              <Link to="/login" className="hover:bg-blue-700 p-2 rounded">Login</Link>
              <Link to="/register" className="hover:bg-blue-700 p-2 rounded">Register</Link>
            </>
          )}
        </nav>
      </div>

      <div className="fixed top-0 left-0 w-full bg-blue-600 text-white flex justify-between items-center p-4 md:hidden">
        <h1 className="text-2xl font-bold">Personal Finance App</h1>
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-blue-600 text-white flex flex-col items-center justify-center space-y-4 md:hidden">
          <Link to="/" onClick={toggleMenu} className="hover:bg-blue-700 p-2 rounded">Home</Link>
          <Link to="/transactions" onClick={toggleMenu} className="hover:bg-blue-700 p-2 rounded">Transactions</Link>
          <Link to="/add-transaction" onClick={toggleMenu} className="hover:bg-blue-700 p-2 rounded">Add Transaction</Link>
          <Link to="/budget" onClick={toggleMenu} className="hover:bg-blue-700 p-2 rounded">Budget</Link>
          <Link to="/reports" onClick={toggleMenu} className="hover:bg-blue-700 p-2 rounded">Reports</Link>
          {userInfo ? (
            <button onClick={handleLogout} className="hover:bg-blue-700 p-2 rounded text-left">Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="hover:bg-blue-700 p-2 rounded">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="hover:bg-blue-700 p-2 rounded">Register</Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
