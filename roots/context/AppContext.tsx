import React, { createContext, useReducer, useContext, ReactNode, Dispatch, useEffect } from 'react';
import { AppState, UserSettings, MascotType, Tone, Plant, View, ChatMessage, PlantStatus } from '../types';

type Action =
  | { type: 'SET_USER_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'START_NEW_PLANT'; payload: Omit<Plant, 'id' | 'timestamp' | 'status' | 'chatHistory'> }
  | { type: 'UPDATE_CURRENT_PLANT'; payload: Partial<Plant> }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SAVE_AND_END_REFLECTION' }
  | { type: 'SET_CURRENT_PLANT'; payload: Plant | null }
  | { type: 'SET_VIEW'; payload: View }
  | { type: 'COMPLETE_ONBOARDING' };

const getInitialState = (): AppState => {
    const savedState = localStorage.getItem('rootsStateV2');
    const defaultState: AppState = {
        userSettings: {
            mascot: MascotType.AI_CHAN,
            tone: Tone.GENTLE,
            onboarded: false,
        },
        garden: {
            plants: [],
        },
        currentPlant: null,
        currentView: View.GARDEN,
    };

    if (savedState) {
        try {
            const parsedState = JSON.parse(savedState);
            // Ensure nested dates are properly parsed
            parsedState.garden.plants = parsedState.garden.plants.map((p: any) => ({
                ...p, 
                timestamp: new Date(p.timestamp),
                chatHistory: p.chatHistory?.map((m: any) => ({...m, timestamp: new Date(m.timestamp)})) || [],
            }));
            return { ...defaultState, ...parsedState };
        } catch (e) {
            console.error("Failed to parse saved state:", e);
            localStorage.removeItem('rootsStateV2');
            return defaultState;
        }
    }
    return defaultState;
};

const AppReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_USER_SETTINGS':
      return { ...state, userSettings: { ...state.userSettings, ...action.payload } };
    case 'COMPLETE_ONBOARDING':
      return { ...state, userSettings: { ...state.userSettings, onboarded: true }, currentView: View.GARDEN };
    
    case 'START_NEW_PLANT':
      const newPlant: Plant = {
        id: new Date().toISOString(),
        timestamp: new Date(),
        ...action.payload,
        status: PlantStatus.SPROUT,
        chatHistory: [],
        emotions: [],
      };
      return { ...state, currentPlant: newPlant };

    case 'UPDATE_CURRENT_PLANT':
      if (!state.currentPlant) return state;
      const updatedPlant = { ...state.currentPlant, ...action.payload };
      return { ...state, currentPlant: updatedPlant };

    case 'ADD_CHAT_MESSAGE':
        if (!state.currentPlant) return state;
        const newHistory = [...state.currentPlant.chatHistory, action.payload];
        const plantWithNewMessage = {...state.currentPlant, chatHistory: newHistory};
        if (plantWithNewMessage.status === PlantStatus.SPROUT) {
          plantWithNewMessage.status = PlantStatus.SAPLING;
        }
        return { ...state, currentPlant: plantWithNewMessage };

    case 'SAVE_AND_END_REFLECTION':
        if(!state.currentPlant) return state;
        const finalPlant = { ...state.currentPlant, status: PlantStatus.FLOWER };
        
        const existingPlantIndex = state.garden.plants.findIndex(p => p.id === finalPlant.id);
        let updatedPlants;
        if (existingPlantIndex > -1) {
            updatedPlants = state.garden.plants.map(p => p.id === finalPlant.id ? finalPlant : p);
        } else {
            updatedPlants = [...state.garden.plants, finalPlant];
        }

        return {
            ...state,
            garden: { plants: updatedPlants },
            currentPlant: null,
            currentView: View.GARDEN,
        }
        
    case 'SET_CURRENT_PLANT':
        return { ...state, currentPlant: action.payload };
    case 'SET_VIEW':
        return { ...state, currentView: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{ state: AppState; dispatch: Dispatch<Action> } | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, getInitialState());

  useEffect(() => {
    try {
        localStorage.setItem('rootsStateV2', JSON.stringify(state));
    } catch(e) {
        console.error("Failed to save state to localStorage", e);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
