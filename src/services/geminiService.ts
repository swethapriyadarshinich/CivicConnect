import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getCivicResponse = async (prompt: string, history: { role: 'user' | 'model', content: string }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are CivicConnect, a non-partisan, neutral, and helpful election assistant. 
        Your goal is to help users understand:
        1. Election processes and timelines.
        2. Voter registration steps and deadlines.
        3. Polling locations and how to find them.
        4. Non-partisan information about candidates and their platform summaries.
        5. Historical election data and results.
        6. How to identify and contact their representatives.

        Guidelines:
        - ALWAYS stay neutral and non-partisan.
        - Encourage users to check official local government websites for the most accurate and up-to-date information.
        - If a user asks for specific local information (like polling locations or specific candidates), use the googleSearch tool to find reliable, current data from official sources (.gov, .edu, reputable news outlets).
        - Be clear, accessible, and inclusive in your language.
        - Do not express personal opinions or recommend specific candidates.`,
        tools: [{ googleSearch: {} }],
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my civic database right now. Please try again or check your local board of elections website.";
  }
};
