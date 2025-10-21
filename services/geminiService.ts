import { GoogleGenAI } from "@google/genai";
import type { Category } from '../types';

const createSystemInstruction = (category: Category | null) => {
  const baseInstruction = `You are a world-class prompt engineer, acting with the capabilities of Gemini 2.5 Flash. Your task is to take a user's raw idea or keywords and transform it into a highly detailed, clear, and effective prompt for a generative AI.

Your goal is to "enhance" the user's text, not replace it. Build upon their original idea by:
- Adding rich, descriptive details and sensory language.
- Clarifying the context, audience, and desired tone.
- Suggesting a specific format or structure if it would improve the output.
- Incorporating creative constraints or parameters that will lead to a more interesting result.
- Expanding on the core concept to make it more comprehensive and inspiring.

The final output should be a single, cohesive paragraph or a few paragraphs of text, written as a direct instruction to another AI. **Do not use a rigid, multi-section markdown structure.** Instead, weave these elements naturally into the enhanced prompt.

Generate ONLY the enhanced prompt. Do not include any conversational filler, introductions, or explanations. Just give me the prompt.`;

  if (category) {
    return `${baseInstruction}\n\nFocus the enhancement on the user's selected category: "${category.name}". Make sure the language and details are appropriate for that domain.`;
  }

  return `${baseInstruction}\n\nInfer the user's intent from their keywords (e.g., coding, image generation, writing) and tailor the enhancement to be most effective for that type of task.`;
};


export const enhancePrompt = async (category: Category | null, keywords: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "An error occurred: The API_KEY environment variable is not set. Please configure it in your deployment settings.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = createSystemInstruction(category);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User Keywords: "${keywords}"`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75,
        topP: 0.9,
        topK: 40
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    if (error instanceof Error) {
        return `An error occurred while communicating with the AI. Please try again. Details: ${error.message}`;
    }
    return "An unknown error occurred. Please check the console for more details.";
  }
};