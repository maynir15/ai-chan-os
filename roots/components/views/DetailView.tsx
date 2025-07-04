import React, { useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { ArrowLeft, Edit, Calendar, Zap } from 'lucide-react';
import ChatMessageBubble from '../chat/ChatMessageBubble';
import { View } from '../../types';
import { SEED_DETAILS } from '../../constants';

const DetailView: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { currentPlant } = state;

  const handleBack = useCallback(() => {
    dispatch({ type: 'SET_CURRENT_PLANT', payload: null });
    dispatch({ type: 'SET_VIEW', payload: View.GARDEN });
  }, [dispatch]);

  const handleRevisit = useCallback(() => {
    dispatch({ type: 'SET_VIEW', payload: View.REFLECTION });
  }, [dispatch]);

  if (!currentPlant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No plant selected.</p>
        <Button onClick={handleBack} className="mt-4">Back to Garden</Button>
      </div>
    );
  }

  const seedDetail = SEED_DETAILS[currentPlant.seedType];

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-butter-yellow/50 to-sage-green/30">
      <Card className="w-full max-w-3xl animate-fade-in-up">
        <div className="flex justify-between items-start mb-6">
            <div>
                <div className="flex items-center gap-4 mb-2">
                    <span className={`text-4xl ${seedDetail.color} p-2 rounded-full`}>{seedDetail.icon}</span>
                    <h1 className="text-3xl font-display text-dark-green">{currentPlant.description}</h1>
                </div>
                <div className="flex gap-4 text-xs text-gray-500 ml-16">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(currentPlant.timestamp).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Zap size={14} /> Intensity: {currentPlant.intensity}</span>
                </div>
            </div>
            <Button onClick={handleBack} variant="ghost" size="sm"><ArrowLeft className="mr-2"/> Back</Button>
        </div>

        <div className="space-y-6 text-left max-h-[60vh] overflow-y-auto pr-2 sm:pr-4">
            {currentPlant.chatHistory && currentPlant.chatHistory.length > 0 ? (
                 <div>
                    <h2 className="font-bold text-lg text-dark-text mb-2">Our Conversation</h2>
                    <div className="bg-warm-cream/50 p-2 sm:p-4 rounded-lg space-y-4">
                        {currentPlant.chatHistory.map((msg) => (
                           <ChatMessageBubble key={msg.id} message={msg} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="font-bold text-lg text-dark-text mb-2">Your Initial Reflection</h2>
                    <p className="bg-warm-cream/50 p-4 rounded-lg italic text-gray-700">No conversation yet.</p>
                </div>
            )}
        </div>
        
        <div className="mt-8 text-center border-t pt-6">
            <Button onClick={handleRevisit} variant="secondary">
                <Edit className="mr-2"/> Re-tend This Memory
            </Button>
            <p className="text-xs text-gray-500 mt-2">Continue the conversation or reflect further.</p>
        </div>

      </Card>
    </div>
  );
};

export default DetailView;