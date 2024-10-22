// src/clients/OpenAIClient.js

import OpenAI from 'openai';
import BaseAIClient from './base-client.js';

/**
 * OpenAIClient provides methods to interact with the OpenAI API.
 */
class OpenAIClient extends BaseAIClient {
  /**
   * Initializes the OpenAI client with the provided API key.
   * @param {Object} config
   * @param {string} config.apiKey - The OpenAI API key.
   */
  constructor({ apiKey }) {
    super();
    const configuration = {
      apiKey,
    };
    this.client = new OpenAI(configuration);
  }

  /**
   * Sends a chat prompt to the OpenAI API and retrieves the response.
   * @param {string} prompt - The chat prompt.
   * @param {Object} [options] - Optional parameters for the chat.
   * @returns {Promise<Object>} The API response data.
   */
  async chat(messages, options = {}) {
    try {
      const stream = await this.client.chat.completions.create({
        model: options.model || 'o1-preview',
        max_tokens: options.max_tokens || 150,
        temperature: options.temperature || 0.7,
        messages: messages || [{
            role: 'user',
            content: 'warning: no messages provided',
        }]
      });
      const { choices } = stream;
      const [{ message }] = choices;
      return message;
    } catch (error) {
      console.error('OpenAI API Error:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default OpenAIClient;
