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
    <form onSubmit={handleSubmit} className="space-y-6 mt-6 max-w-xl mx-auto">
      <div>
        <label className="block mb-1 font-medium">Expense Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Dinner, Rent, Utilities"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Total Amount</label>
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(Number(e.target.value))}
          placeholder="e.g. 5000"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="₦">₦ (Naira)</option>
          <option value="$">$ (USD)</option>
          <option value="€">€ (Euro)</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Add Participant</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            placeholder="Enter name"
            className="flex-1 border p-2 rounded"
          />
          <button
            type="button"
            onClick={handleAddParticipant}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {participants.length > 0 && (
        <div>
          <label className="block mb-1 font-medium">Participants</label>
          <ul className="space-y-2">
            {participants.map((name, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="font-medium">{name}</span>
                {splitType === 'custom' && (
                  <input
                    type="number"
                    placeholder="Share"
                    value={customShares[name] || 0}
                    onChange={(e) => handleCustomShareChange(name, e.target.value)}
                    className="border p-1 rounded w-24"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label className="block mb-1 font-medium">Split Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="splitType"
              value="even"
              checked={splitType === 'even'}
              onChange={() => setSplitType('even')}
            />
            Even Split
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="splitType"
              value="custom"
              checked={splitType === 'custom'}
              onChange={() => setSplitType('custom')}
            />
            Custom Split
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition"
      >
        Split Expense
      </button>
    </form>
  );
}
