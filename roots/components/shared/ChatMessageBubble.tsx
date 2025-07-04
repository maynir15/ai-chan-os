
import React from 'react';
import { ChatMessage, MascotType } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { MASCOT_DETAILS } from '../../constants';
import { Loader } from 'lucide-react';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  isLoading?: boolean;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message, isLoading = false }) => {
  const { state } = useAppContext();
  const isUser = message.sender === 'user';
  
  const mascotIcon = MASCOT_DETAILS[state.userSettings.mascot].icon;

  const bubbleStyles = isUser
    ? 'bg-sage-green text-white self-end rounded-br-none'
    : 'bg-white text-dark-text self-start rounded-bl-none';
    
  const containerStyles = isUser ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex items-end gap-2 ${containerStyles} animate-fade-in-up`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-sky-blue flex items-center justify-center text-lg self-start">
            {mascotIcon}
        </div>
      )}
      <div className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl shadow-md ${bubbleStyles}`}>
        {isLoading ? (
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessageBubble;
