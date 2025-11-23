import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize Gemini API
// Note: process.env.API_KEY is assumed to be available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const optimizeResume = async (resumeText: string): Promise<AnalysisResult> => {
  try {
    const model = "gemini-2.5-flash";
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `You are an expert career coach and Resume/CV optimizer specializing in helping Chinese international students and career switchers land jobs in top-tier global companies.
      
      Analyze the provided resume text. Your tasks are:
      1. Calculate an ATS (Applicant Tracking System) compatibility score (0-100).
      2. Write a professional executive summary suitable for the profile (in English).
      3. List 3-5 key concrete improvements made (in Chinese, e.g., "量化了业绩", "使用了更强的动词").
      4. Identify missing industry keywords (in English).
      5. Rewrite the resume content to be highly professional, result-oriented, and ATS-friendly in English.
      6. Provide a high-quality professional Chinese translation of the optimized content.

      Resume Content:
      ${resumeText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            atsScore: { type: Type.NUMBER, description: "Score from 0 to 100" },
            summary: { type: Type.STRING, description: "A 2-3 sentence professional summary in English" },
            keyImprovements: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of specific improvements made in Chinese"
            },
            missingKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of important keywords that were missing (in English)"
            },
            optimizedContentEnglish: { type: Type.STRING, description: "The full optimized resume in English (Markdown format)" },
            optimizedContentChinese: { type: Type.STRING, description: "The full optimized resume in Chinese (Markdown format)" },
          },
          required: ["atsScore", "summary", "keyImprovements", "optimizedContentEnglish", "optimizedContentChinese", "missingKeywords"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Error optimizing resume:", error);
    throw error;
  }
};