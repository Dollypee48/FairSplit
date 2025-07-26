import React from 'react';

export default function SplitResult({ data }) {
  if (!data) return null;

  const {
    title,
    totalAmount,
    currency,
    splitType,
    customShares = {},
    members = [],
  } = data;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 border-b pb-2">
        💸 Split Summary
      </h2>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">📌 Title:</span> {title}
        </p>
        <p>
          <span className="font-semibold">💰 Total Amount:</span> {currency}
          {Number(totalAmount).toFixed(2)}
        </p>
        <p>
          <span className="font-semibold">🔀 Split Type:</span> {splitType}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-green-700 mb-2">👥 Participants & Amounts</h3>
        <ul className="bg-green-50 rounded-lg p-4 divide-y divide-green-100">
          {members.map((member, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span className="font-medium">{member.name}</span>
              <span className="text-green-800 font-semibold">
                {currency}
                {member.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {splitType === 'custom' && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">⚙️ Custom Shares</h3>
          <ul className="bg-purple-50 rounded-lg p-4 divide-y divide-purple-100">
            {Object.entries(customShares).map(([name, amount], index) => (
              <li key={index} className="py-2 flex justify-between">
                <span>{name}</span>
                <span className="text-purple-800 font-medium">
                  {currency}
                  {Number(amount).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
