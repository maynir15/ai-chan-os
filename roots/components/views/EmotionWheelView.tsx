import React, { useEffect } from 'react';
import Button from '../shared/Button';

console.log("EmotionWheelView.tsx file has been loaded by the browser (Cache test).");

interface EmotionWheelViewProps {
  onComplete: (selectedEmotions: string[]) => void;
}

const EmotionWheelView: React.FC<EmotionWheelViewProps> = ({ onComplete }) => {
  
  useEffect(() => {
    console.log("EmotionWheelView component has successfully mounted (Cache test).");
  }, []);

  console.log("EmotionWheelView component is rendering (Cache test).");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-red-500 p-8 text-white">
      <h1 className="text-5xl font-bold mb-4">IT'S WORKING!</h1>
      <p className="text-xl text-center">
        This red screen confirms that your browser has loaded the latest version of the code.
      </p>
      <p className="mt-2 text-center font-semibold">
        We have fixed the caching issue. We can now proceed with building the real Emotion Wheel.
      </p>
      <Button 
        onClick={() => onComplete(['Test Emotion'])} 
        className="mt-10 bg-white text-red-500 hover:bg-red-100"
        size="lg"
      >
        Click Here to Continue
      </Button>
    </div>
  );
};

export default EmotionWheelView;