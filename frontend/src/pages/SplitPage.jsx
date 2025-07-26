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
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          FairSplit – Smart Expense Splitter
        </h1>

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

      {splitResult && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            Expense Summary
          </h2>
          <SplitResult data={splitResult} />

          <div className="flex flex-col items-center mt-6 gap-3">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow transition duration-200"
            >
              Download 
            </button>
            <button
              onClick={handleClearHistory}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow transition duration-200"
            >
              Clear Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
