const asyncHandler = require('express-async-handler');
const Budget = require('../models/budgetModel');

// @desc    Get all budgets
// @route   GET /api/budgets
// @access  Private
const getBudgets = asyncHandler(async (req, res) => {
  const budgets = await Budget.findAll({ where: { userId: req.user.id } });
  res.json(budgets);
});

// @desc    Add a budget
// @route   POST /api/budgets
// @access  Private
const addBudget = asyncHandler(async (req, res) => {
  const { category, amount } = req.body;

  if (!category || !amount) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const budget = await Budget.create({
    userId: req.user.id,
    category,
    amount,
  });

  res.status(201).json(budget);
});

// @desc    Delete a budget
// @route   DELETE /api/budgets/:id
// @access  Private
const deleteBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.findByPk(req.params.id);

  if (!budget) {
    res.status(404);
    throw new Error('Budget not found');
  }

  if (budget.userId !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await budget.destroy();

  res.status(200).json({ message: 'Budget removed' });
});

module.exports = {
  getBudgets,
  addBudget,
  deleteBudget,
};
