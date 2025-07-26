const express = require('express');
const router = express.Router();
const {
  createExpense,
  getExpenseById,
  getAllExpenses,
  clearAllExpenses,
} = require('../controllers/expenseController');

router.post('/', createExpense);
router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.delete('/clear', clearAllExpenses); 

module.exports = router;
