import React from 'react';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-4">Welcome to Personal Finance App</h1>
        <p className="text-gray-700 text-lg mb-4">
          The Personal Finance App is designed to help you manage your finances effectively. With this app, you can keep track of your income and expenses, set budgets for different categories, and generate reports to analyze your financial status.
        </p>
        <div className="flex justify-center space-x-4">
          <img
            src="https://via.placeholder.com/300"
            alt="Finance Management"
            className="w-1/3 rounded-lg shadow-lg"
          />
          <img
            src="https://via.placeholder.com/300"
            alt="Budget Planning"
            className="w-1/3 rounded-lg shadow-lg"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-4">Features</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg">
          <li>Track your income and expenses</li>
          <li>Set budgets for different categories</li>
          <li>View detailed financial reports</li>
          <li>User-friendly interface</li>
          <li>Secure authentication and data management</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-4">Get Started</h2>
        <p className="text-gray-700 text-lg mb-4">
          To get started, register an account or login if you already have one. Once logged in, you can start adding transactions, setting budgets, and viewing reports.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/register"
            className="px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Register
          </a>
          <a
            href="/login"
            className="px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
