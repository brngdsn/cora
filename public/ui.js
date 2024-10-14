// ui.js

// Function to extract chapters and subheadings
function extractChaptersAndSubheadings(text) {
  const lines = text.split('\n');
  const items = [];
  lines.forEach(line => {
    if (line.startsWith('## ')) {
      // Chapter
      items.push({ type: 'chapter', text: line.substring(3).trim() });
    } else if (line.startsWith('### ')) {
      // Subheading
      items.push({ type: 'subheading', text: line.substring(4).trim() });
    }
  });
  return items;
}

// Function to populate the popup menu
function populatePopupMenu() {
  const text = textEditor.value;
  const items = extractChaptersAndSubheadings(text);
  const popupMenu = document.getElementById('popup-menu');
  popupMenu.innerHTML = ''; // Clear existing content

  const ul = document.createElement('ul');
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.type === 'chapter' ? '' : ''} ${item.text}`;
    ul.appendChild(li);
  });

  if (items.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No chapters or subheadings found.';
    ul.appendChild(li);
  }

  popupMenu.appendChild(ul);
}

// Event listener for the menu button
function setupMenuButton() {
  const menuButton = document.getElementById('menu-button');
  menuButton.addEventListener('click', () => {
    const popupMenu = document.getElementById('popup-menu');
    if (popupMenu.style.display === 'block') {
      popupMenu.style.display = 'none';
    } else {
      populatePopupMenu();
      popupMenu.style.display = 'block';
    }
  });
}

// Hide the popup menus when clicking outside
function setupOutsideClickListener() {
  document.addEventListener('click', function(event) {
    const menuButton = document.getElementById('menu-button');
    const popupMenu = document.getElementById('popup-menu');
    const isClickInsideMenu = menuButton.contains(event.target) ||
                              popupMenu.contains(event.target);

    if (!isClickInsideMenu) {
      popupMenu.style.display = 'none';
    }
  });
}

// Event listener for the submit button
function setupSubmitButton() {
  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', () => {
    const inputField = document.getElementById('floating-input-field');
    const prompt = inputField.value.trim();

    if (prompt) {
      // Prepare the request payload
      const payload = {
        prompt: prompt,
      };

      if (book_outline) {

        // Send the REST request
        fetch('http://localhost:3434/books/chapters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then(async (response) => {
            if (!response.body) {
              throw new Error('ReadableStream not yet supported in this browser.');
            }

            const stream = jsonLinesToObjects(response.body);

            const reader = stream.getReader();

            let updatedBookData = ``;

            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                console.log(updatedBookData);
                // Convert updated book data back to plain text
                const updatedText = jsonChapterToPlainText(updatedBookData);
                textEditor.value += `\n\n`;
                textEditor.scrollTop = textEditor.scrollHeight;
                // Trigger the input event to update the PDF
                textEditor.dispatchEvent(new Event('input'));
                break;
              }
              if (value && value.updated_book_data) {
                // Merge or update the book data incrementally
                updatedBookData = `${updatedBookData}${value.updated_book_data}`;
                // Convert updated book data back to plain text
                const updatedText = value.updated_book_data;
                textEditor.value += `${updatedText}`;
                textEditor.scrollTop = textEditor.scrollHeight;
                console.log(updatedBookData);
              }
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while communicating with the assistant.');
          });

        // Clear the input field
        inputField.value = '';
      } else {

        // Send the REST request
        fetch('http://localhost:3434/book-outlines', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then(async (response) => {
            if (!response.body) {
              throw new Error('ReadableStream not yet supported in this browser.');
            }

            const stream = jsonLinesToObjects(response.body);

            const reader = stream.getReader();

            let updatedBookData = ``;

            textEditor.value = ``;

            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                book_outline = JSON.parse(updatedBookData);
                console.log(book_outline);
                // Convert updated book data back to plain text
                const updatedText = jsonOutlineToPlainText(JSON.parse(updatedBookData));
                textEditor.value = updatedText;
                // Trigger the input event to update the PDF
                textEditor.dispatchEvent(new Event('input'));
                break;
              }
              if (value && value.updated_book_data) {
                // Merge or update the book data incrementally
                updatedBookData = `${updatedBookData}${value.updated_book_data}`;
                // Convert updated book data back to plain text
                const updatedText = value.updated_book_data;
                textEditor.value += `${updatedText}`;
                textEditor.scrollTop = textEditor.scrollHeight;
                console.log(updatedBookData);
              }
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while communicating with the assistant.');
          });

        // Clear the input field
        inputField.value = '';
      }
    }
  });
}

// Prevent event propagation when clicking inside the floating input
function setupFloatingInputClick() {
  document.querySelector('.floating-input').addEventListener('click', function(event) {
    event.stopPropagation();
  });
}

// Event listener for the text editor with debouncing
function setupTextEditorListener() {
  let timeout = null;
  textEditor.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const content = textEditor.value;
      generatePDF(content);
      // Update the popup menu if it's open
      const popupMenu = document.getElementById('popup-menu');
      if (popupMenu.style.display === 'block') {
        populatePopupMenu();
      }
    }, 500);
  });
}
