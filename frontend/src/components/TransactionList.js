import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, deleteTransaction } from '../features/transactions/transactionsSlice';
import Swal from 'sweetalert2';

const TransactionList = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.transactions);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchTransactions());
    }
  }, [dispatch, userInfo]);

  const handleDelete = (transactionId) => {
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
        dispatch(deleteTransaction(transactionId))
          .unwrap()
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your transaction has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              error.message || 'Failed to delete transaction. Please try again.',
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
      <h2 className="text-2xl font-bold text-center text-gray-700">Transactions</h2>
      <div className="mt-4">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-600">No transactions found</p>
        ) : (
          <ul className="space-y-2">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between p-4 bg-white rounded-lg shadow-lg">
                <div>
                  <p className="text-gray-700 font-bold">{transaction.description}</p>
                  <p className="text-gray-500">{transaction.category}</p>
                  <p className="text-gray-500">{new Date(transaction.date).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-gray-500">{transaction.type}</p>
                </div>
                <button
                  onClick={() => handleDelete(transaction.id)}
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

export default TransactionList;
