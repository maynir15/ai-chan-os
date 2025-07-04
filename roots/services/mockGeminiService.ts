import { AIReflection, Tone, ChatMessage, MascotType } from '../types';
import { GEMINI_CHAT_PROMPTS } from '../constants';

// This is a mock service that simulates calls to the Gemini API.
// It returns pre-defined responses after a short delay to mimic a real API call.

class MockGeminiService {
  private simulateDelay(duration: number = 1500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  async startChat(story: string, mascot: MascotType, tone: Tone): Promise<ChatMessage | null> {
    console.log("Mocking startChat with:", { story, mascot, tone });
    await this.simulateDelay();
    
    const mockReflection: AIReflection = {
      summary: "It sounds like you felt unheard during a moment that was important to you.",
      unmetNeeds: ["to be heard", "connection", "understanding"],
      nervousSystemState: "Fight/Flight",
      protectorParts: ["Inner Critic", "Guardian"]
    };

    const aiText = `Thank you for sharing. Here’s a gentle reflection on what I heard:\n\n**Summary:** ${mockReflection.summary}\n\nI wonder if some of these needs were present for you: **${mockReflection.unmetNeeds.join(', ')}**. It also sounds like your nervous system might have been in a **${mockReflection.nervousSystemState}** state, with protector parts like **${mockReflection.protectorParts.join(', ')}** showing up to keep you safe.\n\nHow does this reflection feel to you? You can ask me more about any of these parts, or we can create a "Tender Story" when you're ready.`;

    return {
        id: new Date().toISOString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date(),
        reflection: mockReflection,
    };
  }

  async continueChat(history: ChatMessage[], newUserMessage: string, mascot: MascotType, tone: Tone): Promise<ChatMessage | null> {
    console.log("Mocking continueChat with:", { newUserMessage, mascot, tone });
    await this.simulateDelay(1000);
    
    let aiText = "That's a really interesting point. Could you tell me more about what that felt like in your body?";

    if (newUserMessage.toLowerCase().includes("tender story")) {
      return this.getTenderStory(history, mascot, tone);
    }
    
    if (newUserMessage.toLowerCase().includes("unmet need")) {
        aiText = "Unmet needs are the universal human desires that aren't being met in a particular moment. Naming them can help us understand the root of our feelings without blame. For example, instead of 'You ignored me,' we might say, 'I felt lonely because I have a need for connection.'";
    }

    return {
        id: new Date().toISOString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date(),
    };
  }

  async getTenderStory(history: ChatMessage[], mascot: MascotType, tone: Tone): Promise<ChatMessage | null> {
     console.log("Mocking getTenderStory with:", { mascot, tone });
     await this.simulateDelay();
     const tenderStoryText = "When that happened, I felt unseen and a little lonely. I think I was needing a sense of connection and to feel heard. I'd love to find a way to talk about it so we can understand each other better.";
     
     return {
        id: new Date().toISOString(),
        sender: 'ai',
        text: `Here is your Tender Story, ready for gentle sharing:\n\n*"${tenderStoryText}"*`,
        timestamp: new Date(),
     }
  }
}

export const mockGeminiService = new MockGeminiService();
