import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateAboutMe(profileData: any) {
  try {
    const prompt = `
      Create a professional yet warm and personality-driven "About Myself" section for a Marathi Matrimonial profile.
      Use this data to build a cohesive narrative following this specific Marathi style:
      "Hi I'm [Full Name], [Age], [Height], [Qualification Level], [Qualification Field], Living In [City]. I enjoy [Interests]. My personality is [Nature Type]. I come from a [Family Status] family with [Family Values] values."
      
      User Data:
      Name: ${profileData.fullName}
      Age: ${profileData.age}
      Height: ${profileData.height}
      Education: ${profileData.educationLevel} in ${profileData.educationField}
      Location: ${profileData.city}
      Interests: ${profileData.interests?.join(', ')}
      Nature Type: ${profileData.natureType?.join(', ')}
      Family Status: ${profileData.familyStatus}
      Family Values: ${profileData.familyValues}
      
      Return ONLY the text paragraph.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
