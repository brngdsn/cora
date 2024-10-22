// src/ai-client/base-client.js

/**
 * BaseAIClient defines the interface for AI clients.
 */
class BaseAIClient {
    /**
     * Sends a chat prompt and retrieves the response.
     * @param {string} prompt - The chat prompt.
     * @param {Object} [options] - Optional parameters.
     * @returns {Promise<Object>} The API response data.
     * @throws {Error} If not implemented.
     */
    async chat(prompt, options) {
      throw new Error('Method "chat()" must be implemented.');
    }
  }
  
  export default BaseAIClient;
  