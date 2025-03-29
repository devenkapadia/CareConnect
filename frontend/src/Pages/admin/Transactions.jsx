import React from "react";

const Transactions = () => {
  const transactions = [
    { id: 1, patient: "John Doe", amount: "$200", date: "2025-03-29" },
    { id: 2, patient: "Alice Smith", amount: "$350", date: "2025-03-30" }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id} className="border-b py-4">
            {tx.patient} - {tx.amount} - {tx.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
