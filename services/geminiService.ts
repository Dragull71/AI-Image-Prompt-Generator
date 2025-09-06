
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PROMPT = `You are an expert in AI image generation prompting. Analyze the provided image in detail. Create a descriptive, vivid, and comprehensive prompt that an AI image generator like Midjourney, DALL-E, or Stable Diffusion could use to create a new, high-quality image that captures the essence, style, and details of the original.

Describe the subject, setting, lighting, color palette, composition, and art style. Combine these elements into a final, coherent paragraph. Do not add any extra explanations or introductions like 'Here is the prompt:'. Just output the final prompt text.`;

export const generatePromptFromImage = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: PROMPT,
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating prompt from Gemini API:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
