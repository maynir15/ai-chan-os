import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { MascotType, Tone } from '../../types';
import { MASCOT_DETAILS } from '../../constants';
import Button from '../shared/Button';
import Card from '../shared/Card';

const OnboardingView: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [mascot, setMascot] = useState<MascotType>(state.userSettings.mascot);
  const [tone, setTone] = useState<Tone>(state.userSettings.tone);

  const handleComplete = () => {
    dispatch({ type: 'SET_USER_SETTINGS', payload: { mascot, tone } });
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-sky-blue to-soft-lilac">
      <Card className="w-full max-w-2xl text-center animate-fade-in-up">
        <h1 className="text-4xl font-display text-dark-green mb-2">Welcome to Roots</h1>
        <p className="text-lg text-dark-text mb-8">Let's create a space that feels safe and supportive for you.</p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold font-display mb-4 text-dark-text">Choose Your Guide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(MascotType).map(type => (
              <div
                key={type}
                onClick={() => setMascot(type)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${mascot === type ? 'bg-sage-green text-white shadow-lg scale-105' : 'bg-white/50 hover:bg-white'}`}
              >
                <div className="text-4xl mb-2">{MASCOT_DETAILS[type].icon}</div>
                <div className="font-semibold">{MASCOT_DETAILS[type].name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold font-display mb-4 text-dark-text">Choose Your Tone</h2>
          <div className="flex justify-center flex-wrap gap-4">
            {Object.values(Tone).map(type => (
              <Button
                key={type}
                onClick={() => setTone(type)}
                variant={tone === type ? 'primary' : 'secondary'}
                size="sm"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <Button onClick={handleComplete} size="lg" className="w-full md:w-auto">
          Enter Your Garden
        </Button>
      </Card>
    </div>
  );
};

export default OnboardingView;
