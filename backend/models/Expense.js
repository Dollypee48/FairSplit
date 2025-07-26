const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  participants: [String],
  totalAmount: Number,
  currency: {
    type: String,
    default: '₦',
  },
  splitType: {
    type: String,
    enum: ['even', 'custom', 'percentage'],
    default: 'even',
  },
  customShares: {
    type: Map,
    of: Number,
    default: {},
  },
  members: [
    {
      name: String,
      amount: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Expense', expenseSchema);
