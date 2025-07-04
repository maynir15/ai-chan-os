import React from 'react';
import { Conflict, PlantStatus } from '../../types';
import { SEED_DETAILS } from '../../constants';
import { formatDistanceToNow } from 'date-fns';

interface ConflictCardProps {
  conflict: Conflict;
  onClick: () => void;
}

const statusStyles: Record<PlantStatus, string> = {
    [PlantStatus.SPROUT]: 'bg-sky-blue/20 text-sky-blue-800',
    [PlantStatus.SAPLING]: 'bg-soft-lilac/50 text-purple-800',
    [PlantStatus.FLOWER]: 'bg-sage-green/30 text-dark-green',
};

const ConflictCard: React.FC<ConflictCardProps> = ({ conflict, onClick }) => {
  return (
    <div 
        onClick={onClick}
        className="bg-white/60 p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full w-full animate-fade-in"
    >
      <div>
        <div className="text-4xl mb-2">{SEED_DETAILS[conflict.seedType].icon}</div>
        <h3 className="font-bold text-dark-text truncate">{conflict.description}</h3>
        <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(conflict.timestamp), { addSuffix: true })}
        </p>
      </div>
      <div className={`text-xs font-semibold px-2 py-1 rounded-full self-start ${statusStyles[conflict.status]}`}>
        {conflict.status}
      </div>
    </div>
  );
};

export default ConflictCard;