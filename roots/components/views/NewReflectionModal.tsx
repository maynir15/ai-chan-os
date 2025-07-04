import React, { useState } from 'react';
import { Intensity, SeedType } from '../../types';
import { SEED_DETAILS } from '../../constants';
import Button from '../shared/Button';

interface NewReflectionModalProps {
  onStart: (data: { description: string, seedType: SeedType, intensity: Intensity }) => void;
}

const NewReflectionModal: React.FC<NewReflectionModalProps> = ({ onStart }) => {
  const [description, setDescription] = useState('');
  const [seedType, setSeedType] = useState<SeedType>(SeedType.CONFLICT);
  const [intensity, setIntensity] = useState<Intensity>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onStart({ description, seedType, intensity });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-3xl font-display text-dark-green mb-6 text-center">Plant a New Seed</h2>
      
      <div className="mb-6">
        <label htmlFor="description" className="block text-lg font-semibold mb-2 text-dark-text">What's on your mind?</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., A tough talk with a friend"
          className="w-full p-3 rounded-lg border-2 border-sage-green/50 focus:ring-2 focus:ring-sage-green focus:outline-none"
          required
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-dark-text">What kind of seed is this?</h3>
        <div className="grid grid-cols-2 gap-3">
            {Object.entries(SEED_DETAILS).map(([key, { icon, description }]) => (
                <button
                    type="button"
                    key={key}
                    onClick={() => setSeedType(key as SeedType)}
                    className={`flex items-center gap-3 p-3 text-left rounded-lg transition-all ${seedType === key ? 'bg-sage-green text-white shadow-md' : 'bg-white/50 hover:bg-white'}`}
                >
                    <span className="text-2xl">{icon}</span>
                    <span>{key}</span>
                </button>
            ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-dark-text">How intense does this feel?</h3>
        <div className="flex justify-between items-center bg-white/50 p-2 rounded-full">
            {(['low', 'medium', 'high'] as Intensity[]).map(level => (
                 <button
                    type="button"
                    key={level}
                    onClick={() => setIntensity(level)}
                    className={`w-1/3 py-2 rounded-full text-sm font-semibold transition-colors capitalize ${intensity === level ? 'bg-blush-pink text-white' : 'text-dark-text hover:bg-white/80'}`}
                >
                    {level}
                 </button>
            ))}
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={!description.trim()}>
        Tend to this feeling
      </Button>
    </form>
  );
};

export default NewReflectionModal;
