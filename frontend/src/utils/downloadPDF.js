// src/utils/downloadPDF.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Correct import

export function downloadExpensePDF({ title, totalAmount, currency, splitType, participants, result }) {
  if (!Array.isArray(result)) {
    console.error('Invalid result: expected an array');
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(title || 'Expense Summary', 20, 20);

  doc.setFontSize(12);
  doc.text(`Total Amount: ${currency}${totalAmount}`, 20, 30);
  doc.text(`Split Type: ${splitType}`, 20, 38);

  // Create table from result
  const rows = result.map((entry, index) => [
    index + 1,
    entry.name,
    `${currency}${entry.amount}`,
  ]);

  autoTable(doc, {
    head: [['#', 'Name', 'Amount Owed']],
    body: rows,
    startY: 45,
  });

  doc.save(`${title || 'expense'}_summary.pdf`);
}
