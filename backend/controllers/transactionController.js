const Transaction = require('../models/transactionModel');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ where: { userId: req.user.id } });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
  const { description, amount, category, type, date } = req.body;

  if (!description || !amount || !category || !type || !date) {
    res.status(400).json({ message: 'Please add all fields' });
    return;
  }

  try {
    const transaction = await Transaction.create({
      userId: req.user.id,
      description,
      amount,
      category,
      type,
      date,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }

    if (transaction.userId !== req.user.id) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    await transaction.destroy();
    res.status(200).json({ message: 'Transaction removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};
