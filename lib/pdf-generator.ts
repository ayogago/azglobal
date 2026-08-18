import jsPDF from 'jspdf';

interface TranslationData {
  fileName: string;
  fromLanguage: string;
  toLanguage: string;
  originalText: string;
  translatedText: string;
  certified: boolean;
  translatorName?: string;
  certificationNumber?: string;
}

export function generateTranslationPDF(data: TranslationData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('AZ Global Translations', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 10;
  doc.setFontSize(16);
  doc.text('Certified Translation', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 15;
  doc.setDrawColor(27, 156, 133); // Primary color
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  // Document Information
  yPosition += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Document Information', margin, yPosition);

  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`File Name: ${data.fileName}`, margin, yPosition);

  yPosition += 6;
  doc.text(`Source Language: ${data.fromLanguage}`, margin, yPosition);

  yPosition += 6;
  doc.text(`Target Language: ${data.toLanguage}`, margin, yPosition);

  yPosition += 6;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition);

  // Original Text
  yPosition += 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Original Text', margin, yPosition);

  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const originalLines = doc.splitTextToSize(data.originalText, pageWidth - 2 * margin);
  doc.text(originalLines, margin, yPosition);
  yPosition += originalLines.length * 6;

  // Translated Text
  yPosition += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Translation', margin, yPosition);

  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const translatedLines = doc.splitTextToSize(data.translatedText, pageWidth - 2 * margin);
  doc.text(translatedLines, margin, yPosition);
  yPosition += translatedLines.length * 6;

  // Certification Statement (if certified)
  if (data.certified) {
    yPosition += 15;
    doc.setDrawColor(27, 156, 133);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    yPosition += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Certification Statement', margin, yPosition);

    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const certificationText = `I, ${data.translatorName || 'Certified Translator'}, hereby certify that the above translation from ${data.fromLanguage} to ${data.toLanguage} is accurate and complete to the best of my knowledge and ability.`;
    const certLines = doc.splitTextToSize(certificationText, pageWidth - 2 * margin);
    doc.text(certLines, margin, yPosition);
    yPosition += certLines.length * 5;

    yPosition += 10;
    doc.text(`Certification Number: ${data.certificationNumber || 'AZG-' + Date.now()}`, margin, yPosition);

    yPosition += 6;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition);

    yPosition += 15;
    doc.line(margin, yPosition, margin + 60, yPosition);
    yPosition += 5;
    doc.setFontSize(8);
    doc.text('Translator Signature', margin, yPosition);
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `AZ Global Translations | www.azglobaltranslations.com | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `translation_${data.fileName.replace(/\.[^/.]+$/, '')}_${Date.now()}.pdf`;
  doc.save(fileName);
}
