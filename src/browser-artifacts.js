// using javascript, css, and html build a landing page for a police incident reporting portal where police can report incidences, search incidences, and download reports.
console.clear();
import dotenv from 'dotenv'; dotenv.config();
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import bodyParser from 'body-parser';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3434;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../', 'public')));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your actual API key
});

let thread = null;
const cwd = process.cwd();
const app_id = new Date().getTime();
const app_name = uniqueNamesGenerator({
  dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
  length: 2
}); // big-donkey
const workspace = path.join(cwd, `./workspace/app-${app_id}`);

function write_file(fpath, fdata) {
  const fullPath = path.join(workspace, fpath);
  const dirPath = path.dirname(fullPath);

  // Create directories recursively if they don't exist
  fs.mkdirSync(dirPath, { recursive: true });

  // Write the file, overwriting it if it already exists
  fs.writeFileSync(fullPath, fdata);
}

// Endpoint to initialize the workflow
app.post('/software-architecture', async (req, res) => {

  try {
    const { prompt: content } = req.body;

    const assistant = {
      id: `asst_6yV83vPBenkd12aNXQkeE1we`
    };

    thread = thread ? thread : await openai.beta.threads.create();

    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content
      }
    );
    const run = openai.beta.threads.runs.stream(thread.id, {
      assistant_id: assistant.id,
      response_format: {
        type: "json_object"
      }
    })

    run.on('textCreated', (text) => process.stdout.write('\nassistant > '))
      .on('textDelta', (textDelta, snapshot) => {
        process.stdout.write(textDelta.value);
        const data = { value: textDelta.value, app_id };
        res.write(JSON.stringify(data) + '\n'); // Send each JSON object as a separate line
      })
    const result = await run.finalRun();
    write_file(`index.html`,`${app_name} #app-${app_id}`);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating outline' });
  }
});

// Endpoint to continue the workflow
app.post('/software-developer', async (req, res) => {
  try {
    const file_dto = [];
    const { prompt: content } = req.body;

    const assistant = {
      id: `asst_qjTvzlCoLfy8NMX8PXFlCVuP`
    };

    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content
      }
    );
    const run = openai.beta.threads.runs.stream(thread.id, {
      assistant_id: assistant.id
    })

    run
      .on('textCreated', (text) => process.stdout.write('\nassistant > '))
      .on('textDelta', (textDelta, snapshot) => {
        process.stdout.write(textDelta.value);
        const data = { value: textDelta.value };
        file_dto.push(data.value);
        res.write(JSON.stringify(data) + '\n'); // Send each JSON object as a separate line
      })
      .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
      .on('toolCallDelta', (toolCallDelta, snapshot) => {
        if (toolCallDelta.type === 'code_interpreter') {
          if (toolCallDelta.code_interpreter.input) {
            process.stdout.write(toolCallDelta.code_interpreter.input);
          }
          if (toolCallDelta.code_interpreter.outputs) {
            process.stdout.write('\noutput >\n');
            toolCallDelta.code_interpreter.outputs.forEach((output) => {
              if (output.type === 'logs') {
                process.stdout.write(`\n${output.logs}\n`);
              }
            });
          }
        }
      });
    const result = await run.finalRun();
    const { file_path, content: file_data } = JSON.parse(file_dto.join(``));
    write_file(file_path, file_data);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating chapter content.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
