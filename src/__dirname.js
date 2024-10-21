import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __filename: Get the current file's path
const __filename = fileURLToPath(import.meta.url);

// __dirname: Get the current file's directory
export default dirname(__filename);

// console.log("Current directory:", __dirname);
