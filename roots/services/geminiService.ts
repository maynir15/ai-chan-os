import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { AIReflection, MascotType, Tone, ChatMessage } from '../types';
import { GEMINI_CHAT_PROMPTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

class GeminiService {
  private getChatHistoryForPrompt(history: ChatMessage[]): { role: string, parts: { text: string }[] }[] {
    return history.map(message => ({
      role: message.sender === 'ai' ? 'model' : 'user',
      parts: [{ text: message.text }]
    }));
  }

  async startChat(story: string, emotions: string[] | undefined, mascot: MascotType, tone: Tone): Promise<ChatMessage | null> {
    try {
      const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash-preview-04-17',
        config: {
          systemInstruction: GEMINI_CHAT_PROMPTS.systemInstruction(mascot, tone),
        },
      });
      
      const prompt = GEMINI_CHAT_PROMPTS.getInitialReflection(story, emotions);
      const response: GenerateContentResponse = await chat.sendMessage({ message: prompt });
      
      let jsonStr = response.text.trim();
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[2]) {
        jsonStr = match[2].trim();
      }

      const reflection = JSON.parse(jsonStr) as AIReflection;
      const aiText = `Thank you for sharing. Here’s a gentle reflection on what I heard:\n\n**Summary:** ${reflection.summary}\n\nI wonder if some of these needs were present for you: **${reflection.unmetNeeds.join(', ')}**. It also sounds like your nervous system might have been in a **${reflection.nervousSystemState}** state, with protector parts like **${reflection.protectorParts.join(', ')}** showing up to keep you safe.\n\nHow does this reflection feel to you? You can ask me more about any of these parts, or we can create a "Tender Story" when you're ready.`;
      
      return {
          id: new Date().toISOString(),
          sender: 'ai',
          text: aiText,
          timestamp: new Date(),
          reflection: reflection,
      };

    } catch (error) {
      console.error("Error starting chat with Gemini:", error);
      return null;
    }
  }

  async continueChat(history: ChatMessage[], newUserMessage: string, mascot: MascotType, tone: Tone): Promise<ChatMessage | null> {
    try {
        const chat: Chat = ai.chats.create({
            model: 'gemini-2.5-flash-preview-04-17',
            config: {
              systemInstruction: GEMINI_CHAT_PROMPTS.systemInstruction(mascot, tone)
            },
            history: this.getChatHistoryForPrompt(history),
        });

        const response: GenerateContentResponse = await chat.sendMessage({ message: newUserMessage });
        
        return {
            id: new Date().toISOString(),
            sender: 'ai',
            text: response.text,
            timestamp: new Date(),
        };

    } catch (error) {
        console.error("Error continuing chat with Gemini:", error);
        return null;
    }
  }

  async getTenderStory(history: ChatMessage[], mascot: MascotType, tone: Tone): Promise<string | null> {
     try {
        const chat: Chat = ai.chats.create({
          model: 'gemini-2.5-flash-preview-04-17',
          config: {
            systemInstruction: GEMINI_CHAT_PROMPTS.systemInstruction(mascot, tone),
          },
          history: this.getChatHistoryForPrompt(history),
        });

        const historyText = history.map(m => `${m.sender}: ${m.text}`).join('\n');
        const prompt = GEMINI_CHAT_PROMPTS.getTenderStory(historyText);
        
        const response: GenerateContentResponse = await chat.sendMessage({ message: prompt });
        return response.text;
    } catch (error) {
        console.error("Error getting tender story from Gemini:", error);
        return null;
    }
  }

}

export const geminiService = new GeminiService();