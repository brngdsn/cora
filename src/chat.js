async function chat(client, messages) {
  const stream = await client.chat.completions.create({
    model: 'o1-preview',
    messages
  });
  const { choices } = stream;
  const [{ message }] = choices;
  return message;
}

export default { chat };
