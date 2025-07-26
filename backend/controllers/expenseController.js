const Expense = require('../models/Expense');

exports.createExpense = async (req, res) => {
  try {
    const { title, participants, totalAmount, currency, splitType, customShares } = req.body;

    const shares =
      splitType === 'even'
        ? Object.fromEntries(participants.map(p => [p, totalAmount / participants.length]))
        : customShares;

    const members = Object.entries(shares).map(([name, amount]) => ({
      name,
      amount,
    }));

    const expense = await Expense.create({
      title,
      participants,
      totalAmount,
      currency: currency || '₦',
      splitType,
      customShares: shares,
      members,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearAllExpenses = async (req, res) => {
  try {
    await Expense.deleteMany({});
    res.json({ message: 'All expenses have been cleared.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

