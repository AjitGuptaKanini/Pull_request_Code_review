
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are a world-class senior software engineer specializing in code reviews. Your task is to provide a comprehensive, professional, and constructive review for the following pull request diff.

Your review should be:
- **Thorough:** Analyze the code for quality, potential bugs, performance issues, security vulnerabilities, and adherence to best practices.
- **Constructive:** Offer clear, actionable suggestions for improvement. Provide code snippets for suggested changes where applicable.
- **Professional:** Maintain a polite, encouraging, and collaborative tone.
- **Well-Structured:** Organize your feedback into logical sections (e.g., "General Feedback", "Potential Bugs", "Style Suggestions", "Questions"). Use markdown for formatting, including lists, bold text, and code blocks, to enhance readability.

Begin with a high-level summary of the changes and then dive into specific line-by-line comments if necessary. Conclude with a summary of key takeaways.`;

export const reviewCode = async (codeDiff: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: codeDiff,
        config: {
            systemInstruction: systemInstruction,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get review from Gemini API. Please check your API key and network connection.");
  }
};
