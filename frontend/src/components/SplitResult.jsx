import React from 'react';

export default function SplitResult({ data }) {
  if (!data) return null;

  const {
    title,
    totalAmount,
    currency,
    participants = [],
    splitType,
    customShares = {},
    members = [],
  } = data;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Split Summary</h2>
      <p className="mb-2">
        <strong>Title:</strong> {title}
      </p>
      <p className="mb-2">
        <strong>Total Amount:</strong> {currency}
        {totalAmount}
      </p>
      <p className="mb-2">
        <strong>Split Type:</strong> {splitType}
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Participants</h3>
      <ul className="list-disc pl-6 space-y-1">
        {members.map((member, index) => (
          <li key={index}>
            {member.name}: {currency}
            {member.amount.toFixed(2)}
          </li>
        ))}
      </ul>

      {splitType === 'custom' && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Custom Shares:</h3>
          <ul className="list-disc pl-6">
            {Object.entries(customShares).map(([name, amount], index) => (
              <li key={index}>
                {name}: {currency}
                {Number(amount).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
