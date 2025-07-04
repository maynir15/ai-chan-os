import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { ArrowLeft, Edit } from 'lucide-react';
import ChatMessageBubble from '../shared/ChatMessageBubble';
import { View } from '../../types';

interface ConflictDetailViewProps {
  onBack: () => void;
}

const ConflictDetailView: React.FC<ConflictDetailViewProps> = ({ onBack }) => {
  const { state, dispatch } = useAppContext();
  const { currentPlant: currentConflict } = state;

  if (!currentConflict) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No conflict selected.</p>
        <Button onClick={onBack} className="mt-4">Back to Garden</Button>
      </div>
    );
  }

  const handleRevisit = () => {
    // Re-opens the reflection view for the current conflict
    dispatch({ type: 'SET_VIEW', payload: View.REFLECTION });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-butter-yellow to-sage-green/50">
      <Card className="w-full max-w-3xl animate-fade-in-up">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-display text-dark-green mb-2">{currentConflict.description}</h1>
                <p className="text-sm text-gray-600 mb-6">
                Planted on {new Date(currentConflict.timestamp).toLocaleDateString()}
                </p>
            </div>
            <Button onClick={onBack} variant="ghost" size="sm"><ArrowLeft className="mr-2"/> Back</Button>
        </div>

        <div className="space-y-6 text-left max-h-[60vh] overflow-y-auto pr-4">
            {currentConflict.chatHistory && currentConflict.chatHistory.length > 0 ? (
                 <div>
                    <h2 className="font-bold text-lg text-dark-text mb-2">Our Conversation</h2>
                    <div className="bg-warm-cream/50 p-4 rounded-lg space-y-4">
                        {currentConflict.chatHistory.map((msg, index) => (
                           <ChatMessageBubble key={index} message={msg} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="font-bold text-lg text-dark-text mb-2">Your Initial Story</h2>
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

export default ConflictDetailView;