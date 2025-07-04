import React, { useCallback, useState } from 'react';
import { AppContextProvider, useAppContext } from './context/AppContext';
import { View, SeedType, Intensity } from './types';
import OnboardingView from './components/views/OnboardingView';
import GardenView from './components/views/GardenView';
import ReflectionView from './components/views/ReflectionView';
import DetailView from './components/views/DetailView';
import Modal from './components/shared/Modal';
import NewReflectionModal from './components/views/NewReflectionModal';
import EmotionWheelView from './components/views/EmotionWheelView';

function AppContent(): React.ReactNode {
  const { state, dispatch } = useAppContext();
  const { currentView, userSettings, currentPlant } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPlant = useCallback((plantId: string) => {
    const plant = state.garden.plants.find(p => p.id === plantId);
    if (plant) {
      dispatch({ type: 'SET_CURRENT_PLANT', payload: plant });
      dispatch({ type: 'SET_VIEW', payload: View.DETAIL });
    }
  }, [state.garden.plants, dispatch]);

  const handleStartNewReflection = useCallback((plantData: {description: string, seedType: SeedType, intensity: Intensity}) => {
      dispatch({type: 'START_NEW_PLANT', payload: plantData});
      dispatch({type: 'SET_VIEW', payload: View.EMOTION_WHEEL});
      setIsModalOpen(false);
  }, [dispatch]);
  
  const handleEmotionsSelected = useCallback((emotions: string[]) => {
    if (currentPlant) {
        dispatch({ type: 'UPDATE_CURRENT_PLANT', payload: { emotions }});
        dispatch({ type: 'SET_VIEW', payload: View.REFLECTION });
    }
  },[currentPlant, dispatch]);

  const renderView = () => {
    console.log("Rendering view:", currentView); // DEBUG LOG
    if (!userSettings.onboarded) {
        return <OnboardingView />;
    }
    
    switch (currentView) {
      case View.GARDEN:
        return <GardenView onOpenPlant={handleOpenPlant} onStartReflection={() => setIsModalOpen(true)} />;
      case View.EMOTION_WHEEL:
        return <EmotionWheelView onComplete={handleEmotionsSelected} />;
      case View.REFLECTION:
        return <ReflectionView />;
      case View.DETAIL:
        return <DetailView />;
      default:
        return <GardenView onOpenPlant={handleOpenPlant} onStartReflection={() => setIsModalOpen(true)} />;
    }
  };

  return (
    <div className="bg-warm-cream min-h-screen text-dark-text font-sans">
      {renderView()}
      {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
              <NewReflectionModal onStart={handleStartNewReflection} />
          </Modal>
      )}
    </div>
  );
}

function App(): React.ReactNode {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  )
}

export default App;