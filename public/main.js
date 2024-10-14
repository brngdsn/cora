// main.js

let book_outline = null;
let textEditor, initialText;

// Ensure bookData is available
if (typeof bookData === 'undefined') {
  console.error('bookData is not defined. Make sure book-data.js is included.');
} else {
  // Load initial text into the text editor from bookData
  initialText = jsonToPlainText(bookData);
  textEditor = document.getElementById('text-editor');
  textEditor.value = initialText;
}

// Generate initial PDF
if (typeof textEditor !== 'undefined') {
  generatePDF(textEditor.value);
}

// Setup UI event listeners
setupMenuButton();
setupOutsideClickListener();
setupSubmitButton();
setupFloatingInputClick();
setupTextEditorListener();
