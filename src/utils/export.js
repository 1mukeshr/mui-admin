import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportCsv(filename, headers, rows) {
  const escape = (value) => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [headers.map(escape).join(','), ...rows.map((row) => row.map(escape).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportPdf(filename, title, headers, rows) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(title, 14, 18);
  doc.setFontSize(10);
  doc.text(`Generated ${new Date().toLocaleString()}`, 14, 26);
  autoTable(doc, {
    startY: 32,
    head: [headers],
    body: rows.map((row) => row.map(String)),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [25, 118, 210] },
  });
  doc.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
}
