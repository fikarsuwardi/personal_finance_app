import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReport } from '../features/reports/reportSlice';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Report = () => {
  const dispatch = useDispatch();
  const { report, loading, error } = useSelector((state) => state.reports);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchReport());
    }
  }, [dispatch, userInfo]);

  const formatChartData = (report) => {
    const labels = Object.keys(report);
    const incomeData = labels.map(key => report[key].income);
    const expenseData = labels.map(key => report[key].expense);

    return {
      labels,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Expense',
          data: expenseData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = formatChartData(report);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message || error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-gray-700">Financial Report</h2>
      <div className="mt-4">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Report;
