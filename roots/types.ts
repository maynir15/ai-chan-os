export enum MascotType {
  AI_CHAN = 'Ai-Chan',
  SLEEPY_BEAR = 'Sleepy Bear',
  WISE_CROW = 'Wise Crow',
  CHILL_OTTER = 'Chill Otter',
}

export enum Tone {
  GENTLE = 'Gentle',
  PLAYFUL = 'Playful',
  STOIC = 'Stoic',
  POETIC = 'Poetic',
}

export enum SeedType {
    CONFLICT = "Conflict",
    JOY = "Joy",
    GRATITUDE = "Gratitude",
    GRIEF = "Grief",
}

export type Intensity = 'low' | 'medium' | 'high';

export interface UserSettings {
  mascot: MascotType;
  tone: Tone;
  onboarded: boolean;
}

export interface AIReflection {
  summary: string;
  unmetNeeds: string[];
  nervousSystemState: string;
  protectorParts: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  reflection?: AIReflection;
}

export enum PlantStatus {
    SPROUT = 'sprout',
    SAPLING = 'sapling',
    FLOWER = 'flower'
}

export interface Plant {
  id:string;
  timestamp: Date;
  description: string;
  seedType: SeedType;
  intensity: Intensity;
  status: PlantStatus;
  chatHistory: ChatMessage[];
  finalTenderStory?: string;
  emotions?: string[];
}

export type Conflict = Plant;

export interface Garden {
  plants: Plant[];
}

export interface AppState {
  userSettings: UserSettings;
  garden: Garden;
  currentPlant: Plant | null;
  currentView: View;
}

export enum View {
  ONBOARDING = 'ONBOARDING',
  GARDEN = 'GARDEN',
  REFLECTION = 'REFLECTION',
  DETAIL = 'DETAIL',
  EMOTION_WHEEL = 'EMOTION_WHEEL',
}

// New types for the 3-tier emotion wheel
export interface TertiaryEmotion {
  name: string;
}

export interface SecondaryEmotion {
  name: string;
  tertiary: TertiaryEmotion[];
}

export interface CoreEmotionData {
  name: string;
  color: string;
  secondary: SecondaryEmotion[];
}