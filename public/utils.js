// utils.js

// Utility function to convert JSON lines to JSON objects
function jsonLinesToObjects(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  return new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let lines = buffer.split('\n');
        buffer = lines.pop(); // Save the incomplete line
        for (const line of lines) {
          if (line.trim()) {
            try {
              const json = JSON.parse(line);
              controller.enqueue(json);
            } catch (err) {
              console.error('Invalid JSON:', err);
            }
          }
        }
      }
      if (buffer.trim()) {
        try {
          const json = JSON.parse(buffer);
          controller.enqueue(json);
        } catch (err) {
          console.error('Invalid JSON:', err);
        }
      }
      controller.close();
    },
  });
}

// Helper function to process content arrays
function processContentArray(contents) {
  let text = '';
  contents.forEach(item => {
    switch (item.type) {
      case 'paragraph':
        text += `${item.text}\n\n`;
        break;
      case 'subheading':
        text += `### ${item.text}\n\n`;
        break;
      case 'bullet-list':
        item.items.forEach(bullet => {
          text += `- ${bullet}\n`;
        });
        text += '\n';
        break;
      case 'code':
        text += `\`\`\`\n${item.code}\n\`\`\`\n\n`;
        break;
      case 'page-break':
        text += `---\n\n`;
        break;
      case 'chapter':
        text += `## ${item.title}\n\n`;
        text += processContentArray(item.content);
        break;
      default:
        break;
    }
  });
  return text;
}
