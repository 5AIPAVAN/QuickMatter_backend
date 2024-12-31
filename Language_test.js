// Import required modules
const axios = require("axios");
const DetectLanguage = require("detectlanguage");

// Set up your DetectLanguage API key
const detectLanguageClient = new DetectLanguage("6a4bd020450b8e46e664ffa663234091"); // Replace with your DetectLanguage API key

// API URL and key for your desired API
const targetApiUrl = "https://api.example.com/process"; // Replace with your target API URL
const targetApiKey = "YOUR_TARGET_API_KEY"; // Replace with your target API key

// Function to detect language and make API request
async function processText(inputText) {
  try {
    // Detect the language of the input text
    const detectionResult = await detectLanguageClient.detect(inputText);
    const detectedLanguage = detectionResult[0]?.language;
    console.log(`Detected language: ${detectedLanguage}`);

    if (!detectedLanguage) {
      throw new Error("Failed to detect language.");
    }

    // Make a request to the desired API with the detected language
    const response = await axios.post(
      targetApiUrl,
      {
        text: inputText,
        language: detectedLanguage,
      },
      {
        headers: {
          Authorization: `Bearer ${targetApiKey}`, // Include your target API's authentication
        },
      }
    );

    // Print the API response
    console.log("API Response:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Input text to process
const inputText = "మామ"; // Replace with your input text
processText(inputText);
