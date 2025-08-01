import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/env.js";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const SummarizeText = async (req, res) => {
  if(req.method !== "POST"){
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { pageText } = req.body;

  if (!pageText) {
    return res.status(400).json({ error: "Text is required!" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Summarize the following content with details and organize it using bulletpoints and sections. Dont say anything else. ${pageText}`,
    });

    const summary = response.text;

    if (!summary) {
      return res.status(500).json({ error: "Summarization Failed" });
    }

    return res.status(200).json({ summary });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to summarize" });
  }
}

