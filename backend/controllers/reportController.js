const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transactionModel');

// @desc    Get report
// @route   GET /api/reports
// @access  Private
const getReport = asyncHandler(async (req, res) => {
  const transactions = await Transaction.findAll({ where: { userId: req.user.id } });

  const report = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).getMonth() + 1;
    const year = new Date(transaction.date).getFullYear();
    const key = `${month}-${year}`;

    if (!acc[key]) {
      acc[key] = {
        income: 0,
        expense: 0,
        balance: 0,
      };
    }

    if (transaction.type === 'income') {
      acc[key].income += transaction.amount;
    } else {
      acc[key].expense += transaction.amount;
    }

    acc[key].balance = acc[key].income - acc[key].expense;

    return acc;
  }, {});

  res.json(report);
});

module.exports = {
  getReport,
};
