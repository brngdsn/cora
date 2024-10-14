// pdfGenerator.js

function generatePDF(content) {
  const doc = new PDFDocument({ autoFirstPage: false, size: [1057.5, 1687.5] });
  const stream = doc.pipe(blobStream());

  // Parse the plain text content
  let books;
  try {
    books = plainTextToJson(content);
  } catch (e) {
    console.error('Error parsing text:', e);
    return;
  }

  books.forEach(book => {
    // Add book title
    if (book.title) {
      doc.addPage();
      doc.fontSize(16 + 24).text(book.title, { align: 'center' });
      doc.moveDown();
    }

    // Process the book content
    processContentArrayForPDF(book.content, doc);
  });

  // Finalize PDF file
  doc.end();

  // Stream the PDF into a blob and display in iframe
  stream.on('finish', function() {
    const url = stream.toBlobURL('application/pdf');
    document.getElementById('pdf-preview').src = url;
  });
}

// Helper function to process content arrays for PDF
function processContentArrayForPDF(contents, doc) {
  contents.forEach(item => {
    switch (item.type) {
      case 'chapter':
        doc.addPage();
        doc.fontSize(16 + 20).text(item.title, { underline: true });
        doc.moveDown();
        processContentArrayForPDF(item.content, doc);
        break;
      case 'subheading':
        doc.fontSize(16 + 16).text(item.text, { underline: true });
        doc.moveDown();
        break;
      case 'subsubheading':
        doc.fontSize(16 + 14).text(item.text, { underline: true });
        doc.moveDown();
        break;
      case 'paragraph':
        doc.fontSize(16 + 12).text(item.text);
        doc.moveDown();
        break;
      case 'bullet-list':
        doc.fontSize(16 + 12).list(item.items);
        doc.moveDown();
        break;
      case 'code':
        doc.fontSize(16 + 10).fillColor('gray').text(item.code);
        doc.fillColor('black');
        doc.moveDown();
        break;
      case 'page-break':
        doc.addPage();
        break;
      default:
        break;
    }
  });
}
