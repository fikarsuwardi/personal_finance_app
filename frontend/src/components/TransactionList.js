import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../features/transactions/transactionsSlice';

const TransactionList = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.transactions);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchTransactions());
    }
  }, [dispatch, userInfo]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message || error}</p>;
  }

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.description} - {transaction.amount} - {transaction.category}
            </li>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
