export default function parseJson(input) {
    // Step 1: Trim the input string to remove any leading/trailing spaces
    let trimmedInput = input.trim();

    // Step 2: Check if the string starts with triple backticks, possibly with "json"
    const tripleBackticksRegex = /^```(?:json)?\s*([\s\S]*?)\s*```$/i;
    const match = trimmedInput.match(tripleBackticksRegex);

    // Step 3: If triple backticks are found, extract the content inside
    if (match) {
        trimmedInput = match[1];
    }

    // Step 4: Attempt to parse the content as JSON
    try {
        return JSON.parse(trimmedInput);
    } catch (error) {
        throw new Error("Invalid JSON string");
    }
}

// Example Usage:
// const input = "```json { \"key\": \"value\" } ```";
// const parsed = parseJSONFromString(input);
// console.log(parsed);
