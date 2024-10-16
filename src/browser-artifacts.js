import { writeFileSync } from 'fs';
import dotenv from 'dotenv'; dotenv.config();
import path from 'path';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import bodyParser from 'body-parser';

const app = express();
const port = 3434;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your actual API key
});

let thread = null;
const cwd = process.cwd();
const app_id = new Date().getTime();
const workspace = path.join(cwd, `./workspace/app-${app_id}`);

function write_file (fpath, fname, fdata) {
  return writeFileSync(path.join(workspace, fpath, fname), fdata);
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
        const data = { value: textDelta.value };
        res.write(JSON.stringify(data) + '\n'); // Send each JSON object as a separate line
      })
    const result = await run.finalRun();
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating outline' });
  }
});

// Endpoint to continue the workflow
app.post('/software-developer', async (req, res) => {
  try {
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

    run.on('textCreated', (text) => process.stdout.write('\nassistant > '))
      .on('textDelta', (textDelta, snapshot) => {
        process.stdout.write(textDelta.value);
        const data = { value: textDelta.value };
        res.write(JSON.stringify(data) + '\n'); // Send each JSON object as a separate line
      })
    const result = await run.finalRun();
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating chapter content.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
