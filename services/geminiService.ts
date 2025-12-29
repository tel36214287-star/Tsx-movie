import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  // This is a placeholder check. In a real environment, the key is expected to be set.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function generateScript(prompt: string): Promise<string> {
  try {
    const fullPrompt = `You are a master screenwriter for a dystopian universe like The Hunger Games.
    Based on the following user prompt, write a compelling and atmospheric short script scene.
    The script should have character names in uppercase, followed by their dialogue. Actions and setting descriptions should be in parentheses.
    Keep the scene concise but impactful.

    USER PROMPT: "${prompt}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating script with Gemini API:", error);
    throw new Error("Failed to generate script. The request to the AI service failed.");
  }
}

export async function translateText(text: string, targetLanguage: string = 'Português (Brasil)'): Promise<string> {
  try {
    const translatePrompt = `Translate the following text into ${targetLanguage}. Provide only the translated text, with no additional commentary or framing.

    TEXT TO TRANSLATE:
    "${text}"
    `;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: translatePrompt,
    });
    return response.text;
  } catch (error) {
    console.error(`Error translating text to ${targetLanguage} with Gemini API:`, error);
    throw new Error("Failed to translate text. The request to the AI service failed.");
  }
}
