console.clear();
import dotenv from 'dotenv'; dotenv.config();
import path from 'path';
import __dirname from './__dirname.js';
import parseJson from './parse-json.js';
import AIAPIFactory from './ai-client/ai-api-factory.js';
import writeData from './write-data.js';
import { chill } from './chill.js';
import { chat } from './chat.js';
import { createEmbedding } from './embedding.js';
import { insertEmbedding, queryRelevantMessages } from './vector-db.js';
import { chunkText } from './chunk-text.js';

const arch_prompt = `
  You are an expert software architect who focuses on full-stack web applications using ECMAScript 2024 for nodejs and the browser, express, postgres, html5, css3, and svg. Use this thread's context and user stories to design the file and folder structure for the app design according to the app design proposal in this thread, determine the best design patterns to apply. Without implementing the code, propose an effective structure for the files and folders for the code. Must use a \`package.json\` to manage building and deploying the app locally with \`npm run build\` and \`npm run start\` scripts. Be sure to include a \`README.md\`. Only respond in the following JSON structure:

  \`\`\`json
  {
    working_dir: "./",
    mermaid_arch_diagram: markdown_string,
    files: [file_name_path, ...]
  }
  \`\`\`
`;

const dev_prompt = `
  You're an expert software engineer who focuses on full-stack web applications. Use this thread's context, and implement the requested file according the design proposal in this thread. Don't change any hard coded strings. Be as thorough as possible, don't leave out any details. Comment using \`js-doc\` as best as possible. Respond with only the code, and don't wrap it.
`;

const user_stories = `
  a secure web application. as a user i should be able to register to login. as a user i should be able to login. as a user i should be able to logout. as the restful api i should use rate limiting, csrf, jwt with refresh token, and httponly cookies. as the resultapi api i should use cors. as a user i should be able to upload new files. as a user i should be able to download files i've uploaded from a data grid/table detailed view. as the application i should leverage css3 for visualy stunning responsive design. as the application i should use a soft dark theme. as the css i should use gradients, blurs, transparencies, shadows, and glowing effects. as the application i should come with all the sql required to create and build the database. as the application i should be able to be served from behind an nginx reverse proxy path (e.g., \`https://kbdz.fyi/sup\`).
`;

async function main() {
  const messages = [
    { role: 'system', content: arch_prompt },
    { role: 'user', content: user_stories }
  ];
  const client = await AIAPIFactory.create({
    host: `http://localhost:11434`,
  });
  const arch_message = await client.chat(messages, {
    format: `json`
  });
  const { content: arch_message_content } = arch_message;
  messages.push(arch_message);
  const arch_json = parseJson(arch_message_content);
  const { working_dir, mermaid_arch_diagram, files } = arch_json;
  const app = new Date().getTime();
  messages.push({ role: 'system', content: dev_prompt });
  for (let f = 0; f < files.length; f++) {
    const file = files[f];
    const file_path = path.join(__dirname, `./workspace/app-${app}`, file);
    const impl_prompt = `implement the \`${file}\` file in plain text only.`;
    console.log(impl_prompt);
    messages.push({ role: 'user', content: impl_prompt })
    const dev_message = await client.chat(messages);
    const { content: dev_message_content } = dev_message;
    const file_content = dev_message_content;
    await writeData(file_path, file_content);    
    messages.push(dev_message);
    await chill(5);
  }
}

main();
