import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ChatMessage, PlantStatus, View } from '../../types';
import { geminiService } from '../../services/geminiService';
import Button from '../shared/Button';
import Card from '../shared/Card';
import { Loader, Send, MessageSquarePlus, AlertTriangle, ArrowLeft } from 'lucide-react';
import ChatMessageBubble from '../chat/ChatMessageBubble';

const ReflectionView: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { currentPlant, userSettings } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentPlant?.chatHistory]);

  const handleStartConversation = useCallback(async () => {
    if (!currentPlant || currentPlant.chatHistory.length > 0) return;
    
    setIsLoading(true);
    setError(null);
    
    const aiResponse = await geminiService.startChat(currentPlant.description, currentPlant.emotions, userSettings.mascot, userSettings.tone);
    
    if (aiResponse) {
        dispatch({type: 'ADD_CHAT_MESSAGE', payload: aiResponse});
        if(aiResponse.reflection) {
            dispatch({ type: 'UPDATE_CURRENT_PLANT', payload: {} }); // status is updated in reducer
        }
    } else {
        setError("I'm having trouble reflecting right now. Please try again later.");
    }
    setIsLoading(false);
  }, [currentPlant, userSettings.tone, userSettings.mascot, dispatch]);

  useEffect(() => {
      if(currentPlant && currentPlant.chatHistory.length === 0) {
        handleStartConversation();
      }
  }, [currentPlant, handleStartConversation]);
  
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !currentPlant) return;

    const userMessage: ChatMessage = {
        id: new Date().toISOString(),
        sender: 'user',
        text: text,
        timestamp: new Date(),
    };
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setIsLoading(true);
    setError(null);

    const aiResponse = await geminiService.continueChat(currentPlant.chatHistory, text, userSettings.mascot, userSettings.tone);

    if (aiResponse) {
        dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiResponse });
    } else {
        setError("I'm having trouble responding. Please try again.");
    }
    setIsLoading(false);
  }, [currentPlant, userSettings.mascot, userSettings.tone, dispatch]);


  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      if (!userInput.trim() || isLoading) return;
      sendMessage(userInput);
      setUserInput('');
  }, [userInput, isLoading, sendMessage]);

  const handleGetTenderStory = useCallback(async () => {
    if (!currentPlant || isLoading) return;
    setError(null);
    setIsLoading(true);

    const tenderStory = await geminiService.getTenderStory(currentPlant.chatHistory, userSettings.mascot, userSettings.tone);
    
    if (tenderStory) {
      dispatch({ type: 'UPDATE_CURRENT_PLANT', payload: { finalTenderStory: tenderStory } });
      const tenderStoryMessage: ChatMessage = {
          id: new Date().toISOString(),
          sender: 'ai',
          text: `Here is your Tender Story, ready for gentle sharing:\n\n*"${tenderStory}"*`,
          timestamp: new Date(),
      };
      dispatch({type: 'ADD_CHAT_MESSAGE', payload: tenderStoryMessage});
    } else {
       setError("I couldn't seem to reframe the story. Let's try again.");
    }
    setIsLoading(false);
  }, [currentPlant, isLoading, userSettings.mascot, userSettings.tone, dispatch]);
  
  const handleFinish = useCallback(() => {
      dispatch({type: 'SAVE_AND_END_REFLECTION'});
  }, [dispatch]);
  
  if(!currentPlant) {
      return (
        <div className="p-8 text-center">
            <h2 className="text-xl font-bold">Loading your reflection...</h2>
            <p>If you're stuck, please return to the garden.</p>
            <Button onClick={() => dispatch({type: 'SET_VIEW', payload: View.GARDEN})} className="mt-4">
                <ArrowLeft className="mr-2" /> Back to Garden
            </Button>
        </div>
      );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-soft-lilac to-butter-yellow">
      <Card className="w-full max-w-2xl flex flex-col h-[95vh] sm:h-[90vh]">
        <div className="text-center mb-4 border-b border-sage-green/30 pb-4">
            <h2 className="text-2xl font-display text-dark-green truncate">{currentPlant.description}</h2>
            <p className="text-xs text-gray-500">A conversation with {state.userSettings.mascot}</p>
        </div>
        
        <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-2 sm:p-4 bg-warm-cream/50 rounded-lg space-y-4">
            {currentPlant.chatHistory.map((msg) => (
                <ChatMessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && (
                <ChatMessageBubble message={{id: 'loading', sender: 'ai', text: '...', timestamp: new Date()}} isLoading={true} />
            )}
            {error && <p className="text-red-500 my-4 text-sm flex items-center justify-center"><AlertTriangle className="mr-2 h-4 w-4" />{error}</p>}
        </div>
        
        <div className="mt-4 pt-4 border-t border-sage-green/30">
          {!currentPlant.finalTenderStory && currentPlant.status === PlantStatus.SAPLING && (
            <div className="flex gap-2 mb-2">
              <Button onClick={handleGetTenderStory} variant="secondary" size="sm" className="flex-grow" disabled={isLoading}>
                <MessageSquarePlus size={16} className="mr-2"/> Create Tender Story
              </Button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask a question or share more..."
                  className="flex-grow p-3 rounded-full border-2 border-sage-green focus:ring-2 focus:ring-dark-green focus:outline-none"
                  disabled={isLoading}
              />
              <Button type="submit" variant="primary" size="sm" className="w-12 h-12 flex items-center justify-center" disabled={isLoading || !userInput.trim()}>
                  {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
              </Button>
          </form>
          
          {currentPlant.finalTenderStory && currentPlant.status !== PlantStatus.FLOWER &&
                <Button onClick={handleFinish} variant="ghost" className="w-full mt-2 text-sm">
                  I'm done for now, return to garden.
                </Button>
            }
        </div>
      </Card>
    </div>
  );
};

export default ReflectionView;