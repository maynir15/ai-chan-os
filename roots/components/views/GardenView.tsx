import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { MASCOT_DETAILS } from '../../constants';
import { Pause, Settings } from 'lucide-react';
import GardenContainer from '../garden/GardenContainer';
import Plant from '../garden/Plant';

interface GardenViewProps {
  onStartReflection: () => void;
  onOpenPlant: (plantId: string) => void;
}

const GardenView: React.FC<GardenViewProps> = ({ onStartReflection, onOpenPlant }) => {
  const { state } = useAppContext();
  const { garden, userSettings } = state;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-sky-blue/50 via-warm-cream to-sage-green/30 overflow-hidden">
       <div className="w-full flex justify-between items-center p-4 absolute top-0 left-0 z-20">
        <div className="flex items-center gap-2 text-sm bg-white/50 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-2xl">{MASCOT_DETAILS[userSettings.mascot].icon}</span>
            <span className="font-semibold">{userSettings.tone}</span>
        </div>
        <button className="p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 transition">
            <Settings size={20} className="text-dark-text" />
        </button>
      </div>
      
      <GardenContainer>
        {garden.plants.length === 0 
          ? (
            <div className="absolute inset-0 flex items-center justify-center text-center text-dark-text/70 italic animate-fade-in">
                Your garden is quiet. Ready for new growth.
            </div>
            )
          : (
            <div className="flex flex-wrap justify-center items-center gap-8 p-16">
                {garden.plants.map(plant => (
                  <Plant key={plant.id} plant={plant} onClick={() => onOpenPlant(plant.id)} />
                ))}
            </div>
            )
        }
      </GardenContainer>

      <div className="flex flex-col items-center z-10 sticky bottom-0 py-6 bg-warm-cream/50 backdrop-blur-sm w-full">
        <button
          onClick={onStartReflection}
          className="group relative w-40 h-40 bg-blush-pink rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-ping-slow opacity-0 group-hover:opacity-100"></div>
          <Pause size={48} className="transition-transform duration-300 group-hover:scale-110" />
          <span className="mt-2 font-semibold">PAUSE</span>
        </button>
        <p className="mt-4 text-dark-text font-semibold">Feeling something? Press pause.</p>
      </div>
    </div>
  );
};

export default GardenView;
