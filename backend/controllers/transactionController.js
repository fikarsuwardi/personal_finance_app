const Transaction = require('../models/transactionModel');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ where: { userId: req.user.id } });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const transaction = await Transaction.create({
      description,
      amount,
      category,
      userId: req.user.id,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    if (transaction.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await transaction.destroy();
    res.json({ message: 'Transaction removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
