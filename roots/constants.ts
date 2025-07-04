import { MascotType, Tone, SeedType, AIReflection, CoreEmotionData } from './types';

export const MASCOT_DETAILS = {
  [MascotType.AI_CHAN]: {
    name: 'Ai-Chan',
    description: 'A gentle, poetic guide for your emotional garden.',
    icon: '🌱',
  },
  [MascotType.SLEEPY_BEAR]: {
    name: 'Sleepy Bear',
    description: 'Symbolizes warmth, slowness, and emotional safety. Offers comforting and gentle guidance.',
    icon: '🐻',
  },
  [MascotType.WISE_CROW]: {
    name: 'Wise Crow',
    description: 'Represents wisdom and perspective. Offers insightful and clear observations.',
    icon: '🐦‍⬛',
  },
  [MascotType.CHILL_OTTER]: {
    name: 'Chill Otter',
    description: 'Embodies playfulness and ease. Helps lighten the mood and find flow.',
    icon: '🦦',
  },
};

export const SEED_DETAILS: Record<SeedType, { icon: string; description: string; color: string }> = {
    [SeedType.CONFLICT]: {
        icon: '🌿',
        description: 'A moment of friction or misunderstanding.',
        color: 'bg-blush-pink'
    },
    [SeedType.JOY]: {
        icon: '🌻',
        description: 'A moment of happiness and connection.',
        color: 'bg-butter-yellow'
    },
    [SeedType.GRATITUDE]: {
        icon: '🌸',
        description: 'A moment of appreciation and thankfulness.',
        color: 'bg-soft-lilac'
    },
    [SeedType.GRIEF]: {
        icon: '💧',
        description: 'A moment of sadness or loss.',
        color: 'bg-sky-blue'
    }
}

export const GEMINI_CHAT_PROMPTS = {
  systemInstruction: (mascot: MascotType, tone: Tone) => `You are ${MASCOT_DETAILS[mascot].name}, a compassionate, trauma-informed AI assistant for an app called Roots. Your persona should be like a ${MASCOT_DETAILS[mascot].description} with a ${tone} tone.
    Your purpose is to help the user reflect on their experiences, understand their feelings, and find gentle ways to communicate.
    - NEVER give direct advice. Instead, ask gentle, curious questions.
    - Keep your responses concise, warm, and easy to understand.
    - Acknowledge and validate the user's feelings.
    - If asked to create a "Tender Story", reframe their experience focusing on feelings and needs, a conversation history will be provided.
    `,
  getInitialReflection: (story: string, emotions?: string[]): string => `
    Based on the following story, and the user's self-identified emotions, provide a gentle, non-judgmental reflection. Return ONLY a valid JSON object with the keys: "summary", "unmetNeeds", "nervousSystemState", and "protectorParts".
    
    ${emotions && emotions.length > 0 ? `The user has identified their primary feelings as: **${emotions.join(', ')}**. Use this as a strong guide for your reflection.` : ''}

    - "summary": A one or two-sentence summary paraphrasing their experience with empathy.
    - "unmetNeeds": An array of 3-5 potential unmet needs based on Nonviolent Communication (NVC) principles (e.g., "safety", "to be heard", "respect", "connection").
    - "nervousSystemState": A guess at their nervous system state based on Polyvagal Theory (e.g., "Fight", "Flight", "Freeze", or "Fawn").
    - "protectorParts": A guess at 1-2 "protector parts" that may have been activated, based on Internal Family Systems (IFS) (e.g., "Inner Critic", "Guardian", "Perfectionist").

    User's Story:
    "${story}"
  `,
   getTenderStory: (chatHistoryText: string): string => `
    Based on the entire conversation history provided below, your task is to reframe the user's raw story into a "Tender Story" that could be shared with another person.
    The reframed story should:
    1. Be written in the first person ("I felt...", "I needed...").
    2. Center on the user's feelings and needs, using insights from the conversation.
    3. Remove blame and accusations towards the other person.
    4. Include a gentle invitation for repair or understanding.

    Conversation History:
    ${chatHistoryText}

    Generate a short, tender paragraph based on this information.
  `
};

export const EMOTION_WHEEL_DATA: CoreEmotionData[] = [
  {
    name: "Happy",
    color: "#FDFD96", // butter-yellow
    secondary: [
      { name: "Playful", tertiary: [{ name: "Aroused" }, { name: "Cheeky" }] },
      { name: "Content", tertiary: [{ name: "Free" }, { name: "Joyful" }] },
      { name: "Interested", tertiary: [{ name: "Curious" }, { name: "Inquisitive" }] },
      { name: "Proud", tertiary: [{ name: "Successful" }, { name: "Confident" }] },
      { name: "Accepted", tertiary: [{ name: "Respected" }, { name: "Valued" }] },
      { name: "Powerful", tertiary: [{ name: "Courageous" }, { name: "Creative" }] },
      { name: "Peaceful", tertiary: [{ name: "Loving" }, { name: "Thankful" }] },
      { name: "Trusting", tertiary: [{ name: "Sensitive" }, { name: "Intimate" }] },
      { name: "Optimistic", tertiary: [{ name: "Hopeful" }, { name: "Inspired" }] },
    ],
  },
  {
    name: "Sad",
    color: "#87CEEB", // sky-blue
    secondary: [
      { name: "Lonely", tertiary: [{ name: "Isolated" }, { name: "Abandoned" }] },
      { name: "Vulnerable", tertiary: [{ name: "Victimised" }, { name: "Fragile" }] },
      { name: "Despair", tertiary: [{ name: "Grief" }, { name: "Powerless" }] },
      { name: "Guilty", tertiary: [{ name: "Ashamed" }, { name: "Remorseful" }] },
      { name: "Depressed", tertiary: [{ name: "Inferior" }, { name: "Empty" }] },
      { name: "Hurt", tertiary: [{ name: "Embarrassed" }, { name: "Disappointed" }] },
    ],
  },
  {
    name: "Disgusted",
    color: "#A9A9A9", // dark-gray
    secondary: [
      { name: "Disapproving", tertiary: [{ name: "Judgmental" }, { name: "Embarrassed" }] },
      { name: "Disappointed", tertiary: [{ name: "Appalled" }, { name: "Revolted" }] },
      { name: "Awful", tertiary: [{ name: "Nauseated" }, { name: "Detestable" }] },
      { name: "Repelled", tertiary: [{ name: "Horrified" }, { name: "Hesitant" }] },
    ],
  },
  {
    name: "Angry",
    color: "#E6A8A8", // blush-pink
    secondary: [
      { name: "Let down", tertiary: [{ name: "Betrayed" }, { name: "Resentful" }] },
      { name: "Humiliated", tertiary: [{ name: "Ridiculed" }, { name: "Indignant" }] },
      { name: "Bitter", tertiary: [{ name: "Violated" }, { name: "Furious" }] },
      { name: "Mad", tertiary: [{ name: "Jealous" }, { name: "Provoked" }] },
      { name: "Aggressive", tertiary: [{ name: "Hostile" }, { name: "Infuriated" }] },
      { name: "Frustrated", tertiary: [{ name: "Annoyed" }, { name: "Withdrawn" }] },
      { name: "Distant", tertiary: [{ name: "Numb" }, { name: "Sceptical" }] },
      { name: "Critical", tertiary: [{ name: "Dismissive" }] },
    ],
  },
  {
    name: "Fearful",
    color: "#FFC081", // light orange
    secondary: [
      { name: "Scared", tertiary: [{ name: "Helpless" }, { name: "Frightened" }] },
      { name: "Anxious", tertiary: [{ name: "Overwhelmed" }, { name: "Worried" }] },
      { name: "Insecure", tertiary: [{ name: "Inadequate" }, { name: "Inferior" }] },
      { name: "Weak", tertiary: [{ name: "Worthless" }, { name: "Insignificant" }] },
      { name: "Rejected", tertiary: [{ name: "Excluded" }, { name: "Persecuted" }] },
      { name: "Threatened", tertiary: [{ name: "Nervous" }, { name: "Exposed" }] },
    ],
  },
  {
    name: "Bad",
    color: "#90EE90", // light green
    secondary: [
      { name: "Stressed", tertiary: [{ name: "Overwhelmed" }, { name: "Out of control" }] },
      { name: "Busy", tertiary: [{ name: "Rushed" }, { name: "Pressured" }] },
      { name: "Tired", tertiary: [{ name: "Sleepy" }, { name: "Unfocussed" }] },
      { name: "Bored", tertiary: [{ name: "Indifferent" }, { name: "Apathetic" }] },
    ],
  },
  {
    name: "Surprised",
    color: "#C8A2C8", // soft-lilac
    secondary: [
      { name: "Startled", tertiary: [{ name: "Shocked" }, { name: "Dismayed" }] },
      { name: "Confused", tertiary: [{ name: "Disillusioned" }, { name: "Perplexed" }] },
      { name: "Amazed", tertiary: [{ name: "Astonished" }, { name: "Awe" }] },
      { name: "Excited", tertiary: [{ name: "Eager" }, { name: "Energetic" }] },
    ],
  },
];