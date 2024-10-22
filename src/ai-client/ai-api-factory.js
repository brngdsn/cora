// src/ai-client/ai-api-factory.js

import dotenv from 'dotenv'; dotenv.config();
import OpenAIClient from './openai-client.js';
import OllamaClient from './ollama-client.js';

/**
 * AIAPIFactory is responsible for creating AI API client instances.
 */
class AIAPIFactory {
  /**
   * Creates an instance of OpenAIClient or OllamaClient based on environment variables.
   * @param {Object} [options] - Optional configuration overrides.
   * @param {string} [options.apiKey] - OpenAI API key.
   * @param {string} [options.host] - Ollama server host URL.
   * @returns {Promise<Object>} An instance of the selected AI client with a `chat()` method.
   * @throws {Error} If no valid configuration is found.
   */
  static async create(options = {}) {
    const { apiKey: envApiKey, host: envHost } = process.env;
    const apiKey = options.apiKey || envApiKey;
    const host = options.host || envHost;

    if (apiKey) {
      console.log('Initializing OpenAIClient');
      return new OpenAIClient(options);
    } else if (host) {
      console.log('Initializing OllamaClient');
      return new OllamaClient(options);
    } else {
      throw new Error(
        'No AI API configuration found. Please set OPENAI_API_KEY or OLLAMA_HOST in your environment variables.'
      );
    }
  }
}

export default AIAPIFactory;
