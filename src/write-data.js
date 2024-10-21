import { writeFile } from 'fs/promises';
import { dirname } from 'path';
import { mkdir } from 'fs/promises';

export default async function writeData(pathname, data) {
    try {
        // Step 1: Ensure the directory exists by creating it if it doesn't
        const directory = dirname(pathname);
        await mkdir(directory, { recursive: true });

        // Step 2: Write the data to the file (overwrites if it exists)
        await writeFile(pathname, data, 'utf8');
        console.log(`Data successfully written to ${pathname}`);
    } catch (error) {
        console.error(`Failed to write data to ${pathname}:`, error);
    }
}

// Example Usage:
// const path = './eg-dir/eg-file.data';
// const data = 'This is some example content';
// writeDataToFile(path, data);
