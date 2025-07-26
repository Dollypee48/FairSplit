import { useState } from 'react';
import axios from 'axios';

export default function ExpenseForm({
  title,
  setTitle,
  participants,
  setParticipants,
  totalAmount,
  setTotalAmount,
  splitType,
  setSplitType,
  customShares,
  setCustomShares,
  currency,
  setCurrency,
  setResult,
}) {
  const [newParticipant, setNewParticipant] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      participants,
      totalAmount: Number(totalAmount),
      currency,
      splitType,
      customShares,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/expenses', data);
      setResult(res.data);
    } catch (err) {
      console.error('Error submitting expense:', err);
    }
  };

  const handleAddParticipant = () => {
    const trimmed = newParticipant.trim();
    if (trimmed && !participants.includes(trimmed)) {
      setParticipants([...participants, trimmed]);

      if (splitType === 'custom') {
        setCustomShares({ ...customShares, [trimmed]: 0 });
      }

      setNewParticipant('');
    }
  };

  const handleCustomShareChange = (name, value) => {
    setCustomShares({
      ...customShares,
      [name]: Number(value),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow-xl border border-gray-100 p-6 rounded-2xl"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Expense</h2>

      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Expense Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Dinner, Rent, Utilities"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Total Amount</label>
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(Number(e.target.value))}
          placeholder="e.g. 5000"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
          required
        />
      </div>

      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="₦">₦ (Naira)</option>
          <option value="$">$ (USD)</option>
          <option value="€">€ (Euro)</option>
        </select>
      </div>

      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Add Participant</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            placeholder="Enter name"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddParticipant}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

     
      {participants.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Participants</label>
          <ul className="space-y-2">
            {participants.map((name, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-gray-800">
                <span className="font-medium">{name}</span>
                {splitType === 'custom' && (
                  <input
                    type="number"
                    value={customShares[name] || 0}
                    onChange={(e) => handleCustomShareChange(name, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-24 text-sm focus:ring-1 focus:ring-green-500"
                    placeholder="Share"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Split Type</label>
        <div className="flex gap-6 text-sm">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="splitType"
              value="even"
              checked={splitType === 'even'}
              onChange={() => setSplitType('even')}
              className="accent-green-600"
            />
            Even Split
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="splitType"
              value="custom"
              checked={splitType === 'custom'}
              onChange={() => setSplitType('custom')}
              className="accent-green-600"
            />
            Custom Split
          </label>
        </div>
      </div>

      
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-medium w-full py-3 rounded-lg text-sm transition"
      >
        Split Expense
      </button>
    </form>
  );
}
