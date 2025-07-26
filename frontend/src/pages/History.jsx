import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function History() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const clearHistory = async () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      try {
        await axios.delete("http://localhost:5000/api/expenses/clear");
        setExpenses([]);
      } catch (err) {
        console.error("Error clearing history:", err);
      }
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense History", 14, 15);

    const rows = expenses.map((exp) => [
      exp.title,
      exp.totalAmount?.toLocaleString(),
      exp.currency,
      exp.splitType,
      exp.participants?.join(", "),
      new Date(exp.createdAt).toLocaleString(),
    ]);

    autoTable(doc, {
      startY: 20,
      head: [["Title", "Amount", "Currency", "Split Type", "Participants", "Date"]],
      body: rows,
    });

    doc.save("expense-history.pdf");
  };

  const getSymbol = (currency) => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "NGN":
      default:
        return "₦";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-600">Expense History</h1>
        <div className="space-x-4">
          <button
            onClick={downloadPDF}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download 
          </button>
          <button
            onClick={clearHistory}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear History
          </button>
        </div>
      </div>

      {expenses.length === 0 ? (
        <p className="text-gray-600">No expenses yet.</p>
      ) : (
        <ul className="space-y-6">
          {expenses.map((exp) => (
            <li
              key={exp._id}
              className="border border-green-200 p-5 rounded-lg bg-white shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {exp.title}
              </h2>

              <div className="mb-2">
                <span className="text-lg font-semibold text-gray-800">Total:</span>{" "}
                <span className="text-green-700 font-medium">
                  {getSymbol(exp.currency)}
                  {exp.totalAmount?.toLocaleString()}
                </span>
              </div>

              <div className="mb-2">
                <span className="text-sm text-gray-600">Split Type:</span>{" "}
                <span className="capitalize font-medium">{exp.splitType}</span>
              </div>

              <div className="mb-2">
                <span className="text-sm text-gray-600">Participants:</span>{" "}
                <span className="text-sm text-gray-800">{exp.participants?.join(", ")}</span>
              </div>

              <div className="mb-4 text-sm text-gray-500">
                {new Date(exp.createdAt).toLocaleString()}
              </div>

              {exp.customShares && Object.keys(exp.customShares).length > 0 && (
                <div className="bg-green-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-gray-700 mb-2">Custom Shares:</p>
                  {Object.entries(exp.customShares).map(([name, amt]) => (
                    <div key={name} className="text-gray-700 text-sm">
                      {name}: {getSymbol(exp.currency)}
                      {amt.toLocaleString()}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
