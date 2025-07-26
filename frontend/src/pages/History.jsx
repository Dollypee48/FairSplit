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
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-green-700 tracking-tight">Expense History</h1>
        <div className="flex gap-3">
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition"
          >
            Download PDF
          </button>
          <button
            onClick={clearHistory}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition"
          >
            Clear History
          </button>
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center text-gray-600 mt-12 text-lg">
          No expenses have been recorded yet.
        </div>
      ) : (
        <ul className="space-y-6">
          {expenses.map((exp) => (
            <li
              key={exp._id}
              className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-md transition p-6"
            >
              <div className="flex flex-col md:flex-row justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-800">{exp.title}</h2>
                <div className="text-green-700 font-bold text-lg">
                  {getSymbol(exp.currency)}{exp.totalAmount?.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>
                  <span className="font-medium text-gray-600">Split Type:</span>{" "}
                  <span className="capitalize">{exp.splitType}</span>
                </div>

                <div>
                  <span className="font-medium text-gray-600">Participants:</span>{" "}
                  <span>{exp.participants?.join(", ")}</span>
                </div>

                <div className="text-gray-500">
                  {new Date(exp.createdAt).toLocaleString()}
                </div>
              </div>

              {exp.customShares && Object.keys(exp.customShares).length > 0 && (
                <div className="mt-4 bg-green-50 rounded-lg p-4">
                  <p className="font-medium text-sm text-green-800 mb-2">Custom Shares:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-800">
                    {Object.entries(exp.customShares).map(([name, amt]) => (
                      <li key={name}>
                        {name}: {getSymbol(exp.currency)}{amt.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
