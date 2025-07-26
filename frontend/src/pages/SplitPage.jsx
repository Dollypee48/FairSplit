import { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import SplitResult from '../components/SplitResult';
import { downloadExpensePDF } from '../utils/downloadPDF';

export default function SplitPage() {
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currency, setCurrency] = useState('₦');
  const [splitType, setSplitType] = useState('even');
  const [customShares, setCustomShares] = useState({});
  const [splitResult, setSplitResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('splitHistory')) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (splitResult && title && totalAmount > 0 && participants.length > 0) {
      const newEntry = {
        title,
        totalAmount,
        currency,
        splitType,
        participants,
        result: splitResult,
        date: new Date().toLocaleString(),
      };

      const updatedHistory = [newEntry, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('splitHistory', JSON.stringify(updatedHistory));
    }
  }, [splitResult]);

  const handleDownload = () => {
    const formattedResult = Array.isArray(splitResult)
      ? splitResult
      : Object.entries(splitResult).map(([name, amount]) => ({
          name,
          amount,
        }));

    downloadExpensePDF({
      title,
      totalAmount,
      currency,
      splitType,
      participants,
      result: formattedResult,
    });
  };

  const handleClearHistory = () => {
    localStorage.removeItem('splitHistory');
    setHistory([]);
    setSplitResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-14">
      {/* Left: Form */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-800 mb-8 text-center leading-tight tracking-tight">
          FairSplit <span className="text-green-600">– Smart Expense Splitter</span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <ExpenseForm
            title={title}
            setTitle={setTitle}
            participants={participants}
            setParticipants={setParticipants}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            currency={currency}
            setCurrency={setCurrency}
            splitType={splitType}
            setSplitType={setSplitType}
            customShares={customShares}
            setCustomShares={setCustomShares}
            setResult={setSplitResult}
          />
        </div>
      </div>

      {/* Right: Result */}
      {splitResult && (
        <div className="flex flex-col items-center justify-start">
          <div className="w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Expense Summary
            </h2>

            <SplitResult data={splitResult} />

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleDownload}
                className="px-6 py-3 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md transition-all duration-200"
              >
                📄 Download Summary
              </button>

              <button
                onClick={handleClearHistory}
                className="px-6 py-3 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-md transition-all duration-200"
              >
                🗑️ Clear Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
