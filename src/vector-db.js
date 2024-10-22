// vectorDB.js

async function insertEmbedding(conversation_id, embedding, message) {
  const query = `
    INSERT INTO messages (conversation_id, embedding, message, role, chunk_index, original_message_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
  `;
  const values = [
    conversation_id,
    embedding,
    message.content,
    message.role,
    message.chunk_index,
    message.original_message_id,
  ];
  const res = await client.query(query, values);
  return res.rows[0].id;
}

async function queryRelevantMessages(conversation_id, content, topN) {
  const chunks = chunkText(content);
  let allRelevantMessages = [];

  for (const chunk of chunks) {
    const queryEmbedding = await createEmbedding(chunk);
    const query = `
      SELECT original_message_id, role, message, chunk_index
      FROM messages
      WHERE conversation_id = $1
      ORDER BY embedding <#> $2::vector
      LIMIT $3;
    `;
    const res = await client.query(query, [conversation_id, queryEmbedding, topN]);
    allRelevantMessages.push(...res.rows);
  }

  // Group chunks by original_message_id
  const groupedMessages = {};
  for (const row of allRelevantMessages) {
    const { original_message_id, role, message, chunk_index } = row;
    if (!groupedMessages[original_message_id]) {
      groupedMessages[original_message_id] = {
        role: role,
        contentChunks: [],
      };
    }
    groupedMessages[original_message_id].contentChunks[chunk_index] = message;
  }

  // Reconstruct messages
  const reconstructedMessages = Object.values(groupedMessages).map(msg => ({
    role: msg.role,
    content: msg.contentChunks.join(''),
  }));

  // Remove duplicates and limit to topN messages
  const uniqueMessages = [
    ...new Map(reconstructedMessages.map(item => [item.content, item])).values(),
  ];
  return uniqueMessages.slice(0, topN);
}

export default { insertEmbedding, queryRelevantMessages };
