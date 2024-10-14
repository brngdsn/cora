// converters.js

// Function to convert JSON data to plain text
function jsonToPlainText(data) {
  let text = '';

  data.forEach(book => {
    text += `# ${book.title}\n\n`;
    if (book.content) {
      // Content outside chapters
      text += processContentArray(book.content);
    }
    if (book.chapters) {
      book.chapters.forEach(chapter => {
        text += `## ${chapter.title}\n\n`;
        text += processContentArray(chapter.content);
      });
    }
  });

  return text;
}

// Function to convert JSON outline data to plain text
function jsonOutlineToPlainText(data) {
  let text = `# ${data.book_title}\n\n`;

  text += `## Table of Contents\n\n`;

  data.chapters.forEach(chapter => {
    text += `### ${chapter.chapter_title}\n\n`;
    if (chapter.chapter_sections) {
      chapter.chapter_sections.forEach(section => {
        text += `- **${section.section_title}**: `;
        text += `${section.section_description}\n\n`;
      });
    }
  });

  return text;
}

// Function to convert JSON chapter data to plain text
function jsonChapterToPlainText(data) {
  let text = data;

  return text;
}

// Function to convert plain text back to JSON
function plainTextToJson(text) {
  const lines = text.split('\n');
  let book = {
    title: '',
    content: []
  };
  let currentChapter = null;
  let inCodeBlock = false;
  let codeBlockContent = '';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      continue;
    }

    // Check for code block start/end
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      if (!inCodeBlock) {
        // End of code block
        let codeItem = {
          type: 'code',
          code: codeBlockContent.trim()
        };
        addToCurrentContext(codeItem);
        codeBlockContent = '';
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent += line + '\n';
      continue;
    }

    // Check for explicit page break
    if (line.trim() === '---') {
      let pageBreakItem = {
        type: 'page-break'
      };
      addToCurrentContext(pageBreakItem);
      continue;
    }

    if (line.startsWith('# ')) {
      // Book title
      book.title = line.substring(2).trim();
    } else if (line.startsWith('## ')) {
      // New chapter
      currentChapter = {
        type: 'chapter',
        title: line.substring(3).trim(),
        content: []
      };
      book.content.push(currentChapter);
    } else if (line.startsWith('### ')) {
      // Subheading
      let subheadingItem = {
        type: 'subheading',
        text: line.substring(4).trim()
      };
      addToCurrentContext(subheadingItem);
    } else if (line.startsWith('#### ')) {
      // Sub-subheading
      let subheadingItem = {
        type: 'subsubheading',
        text: line.substring(5).trim()
      };
      addToCurrentContext(subheadingItem);
    } else if (line.startsWith('- ')) {
      // Bullet list
      let items = [];
      while (line && line.startsWith('- ')) {
        items.push(line.substring(2).trim());
        i++;
        if (i < lines.length) {
          line = lines[i];
        } else {
          break;
        }
      }
      i--; // Step back one line
      let bulletListItem = {
        type: 'bullet-list',
        items: items
      };
      addToCurrentContext(bulletListItem);
    } else {
      // Paragraph
      let paragraph = line;
      while (
        i + 1 < lines.length &&
        lines[i + 1].trim() !== '' &&
        !lines[i + 1].startsWith('#') &&
        !lines[i + 1].startsWith('```') &&
        !lines[i + 1].startsWith('- ') &&
        !lines[i + 1].startsWith('### ') &&
        !lines[i + 1].startsWith('## ') &&
        lines[i + 1].trim() !== '---'
      ) {
        i++;
        paragraph += '\n' + lines[i];
      }
      let paragraphItem = {
        type: 'paragraph',
        text: paragraph.trim()
      };
      addToCurrentContext(paragraphItem);
    }
  }

  return [book]; // Return as an array to match original structure

  // Helper function to add content to the current context
  function addToCurrentContext(item) {
    if (currentChapter) {
      currentChapter.content.push(item);
    } else {
      if (!book.content) {
        book.content = [];
      }
      book.content.push(item);
    }
  }
}
