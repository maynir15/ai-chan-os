import React from 'react';
import { Plant, PlantStatus } from '../../types';
import SproutIcon from '../icons/SproutIcon';
import SaplingIcon from '../icons/SaplingIcon';
import FlowerIcon from '../icons/FlowerIcon';
import { SEED_DETAILS } from '../../constants';
import JoyFlowerIcon from '../icons/JoyFlowerIcon';
import GratitudeFlowerIcon from '../icons/GratitudeFlowerIcon';
import GriefFlowerIcon from '../icons/GriefFlowerIcon';

interface PlantProps {
  plant: Plant;
  onClick: () => void;
}

const Plant: React.FC<PlantProps> = ({ plant, onClick }) => {

  const getStatusIcon = () => {
    switch (plant.status) {
      case PlantStatus.SPROUT:
        return <SproutIcon className="w-full h-full" />;
      case PlantStatus.SAPLING:
        return <SaplingIcon className="w-full h-full" />;
      case PlantStatus.FLOWER:
        switch(plant.seedType) {
            case 'Joy': return <JoyFlowerIcon className="w-full h-full" />;
            case 'Gratitude': return <GratitudeFlowerIcon className="w-full h-full" />;
            case 'Grief': return <GriefFlowerIcon className="w-full h-full" />;
            case 'Conflict':
            default:
                return <FlowerIcon className="w-full h-full" />;
        }
    }
  };

  return (
    <div 
      onClick={onClick}
      className="relative w-24 h-24 sm:w-32 sm:h-32 group cursor-pointer animate-fade-in"
      title={plant.description}
    >
      <div className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-110">
        {getStatusIcon()}
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-max px-2 py-1 text-xs bg-black/50 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {plant.description}
      </div>
    </div>
  );
};

export default Plant;
