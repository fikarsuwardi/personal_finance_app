import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgets, addBudget, deleteBudget } from '../features/budgets/budgetSlice';
import Swal from 'sweetalert2';

const Budget = () => {
  const dispatch = useDispatch();
  const { budgets, loading, error } = useSelector((state) => state.budgets);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
  });

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchBudgets());
    }
  }, [dispatch, userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addBudget(formData)).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Budget Added',
        text: 'Your budget has been added successfully!',
      });
      setFormData({
        category: '',
        amount: '',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Budget',
        text: error.message || 'Failed to add budget. Please try again.',
      });
    }
  };

  const handleDelete = (budgetId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBudget(budgetId))
          .unwrap()
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your budget has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              error.message || 'Failed to delete budget. Please try again.',
              'error'
            );
          });
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message || error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-gray-700">Budgets</h2>
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter category"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Add Budget
            </button>
          </div>
        </form>
        {budgets.length === 0 ? (
          <p className="text-center text-gray-600">No budgets found</p>
        ) : (
          <ul className="space-y-2">
            {budgets.map((budget) => (
              <li key={budget.id} className="flex justify-between p-4 bg-white rounded-lg shadow-lg">
                <div>
                  <p className="text-gray-700 font-bold">{budget.category}</p>
                  <p className="text-gray-500">${budget.amount.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleDelete(budget.id)}
                  className="ml-4 px-4 py-2 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Budget;
