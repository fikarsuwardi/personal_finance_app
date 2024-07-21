import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/user/userSlice';
import Swal from 'sweetalert2';

const Navbar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(logout());
    Swal.fire({
      icon: 'success',
      title: 'Logout Successful',
      text: 'You have successfully logged out!',
    });
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl">Personal Finance App</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/transactions" className="hover:text-gray-300">Transactions</Link>
          </li>
          <li>
            <Link to="/add-transaction" className="hover:text-gray-300">Add Transaction</Link>
          </li>
          <li>
            <Link to="/budget" className="hover:text-gray-300">Budget</Link>
          </li>
          <li>
            <Link to="/reports" className="hover:text-gray-300">Reports</Link>
          </li>
          {userInfo ? (
            <>
              <li>
                <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-300">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
