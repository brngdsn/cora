// embedding.js

async function createEmbedding(client, content) {
  const response = await client.createEmbedding({
    model: 'text-embedding-ada-002',
    input: content,
  });
  const { data } = response;
  const { data: [{ embedding }] } = data;
  return embedding;
}

export { createEmbedding };
