// src/clients/OllamaClient.js

import { Ollama } from 'ollama';
import BaseAIClient from './base-client.js';

/**
 * OllamaClient provides methods to interact with the Ollama API.
 */
class OllamaClient extends BaseAIClient {
  /**
   * Initializes the Ollama client with the provided host.
   * @param {Object} config
   * @param {string} config.host - The Ollama server host URL.
   */
  constructor({ host }) {
    super();
    this.host = host;
    this.client = new Ollama({ host });
  }

  /**
   * Sends a chat prompt to the Ollama API and retrieves the response.
   * @param {string} prompt - The chat prompt.
   * @param {Object} [options] - Optional parameters for the chat.
   * @returns {Promise<Object>} The API response data.
   */
  async chat(messages, options = {}) {
    try {
      console.log(`Messages: ${messages.length}`);
      const response = await this.client.chat({
        model: options.model || 'llama3.2',
        max_tokens: options.max_tokens || 150,
        temperature: options.temperature || 0.7,
        format: options.format || undefined,
        stream: true,
        messages: messages || [{
            role: 'user',
            content: 'warning: no messages provided',
        }]
      });
      let entire_response = ``;
      for await (const part of response) {
        const { message } = part;
        const { content } = message;
        process.stdout.write(content);
        entire_response = `${entire_response}${content}`;
      }
      const { message } = { message: { content: entire_response } };
      return message;
    } catch (error) {
      console.error('Ollama API Error:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default OllamaClient;
