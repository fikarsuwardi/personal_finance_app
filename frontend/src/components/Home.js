import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Welcome to Personal Finance App</h1>
        {userInfo ? (
          <p className="text-lg text-gray-700 mb-4">
            Hello, {userInfo.username}! Manage your finances effectively with our app.
          </p>
        ) : (
          <p className="text-lg text-gray-700 mb-4">
            The Personal Finance App is designed to help you manage your finances effectively. Track your income and expenses, set budgets, and gain insights into your financial health through detailed reports and visualizations.
          </p>
        )}
        <div className="mt-8 text-center">
          {!userInfo && (
            <a href="/register" className="px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
              Get Started
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
    