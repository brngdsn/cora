import { encode, decode } from 'gpt-3-encoder';

function chunkText(text, maxTokens = 800, overlap = 200) {
  const tokens = encode(text);
  const chunks = [];
  let start = 0;

  while (start < tokens.length) {
    const end = Math.min(start + maxTokens, tokens.length);
    const chunkTokens = tokens.slice(start, end);
    chunks.push(decode(chunkTokens));
    start += maxTokens - overlap;
  }

  return chunks;
}

export default { chunkText };
