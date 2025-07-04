import React from 'react';
import { ChatMessage } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { MASCOT_DETAILS } from '../../constants';

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

  // A simple markdown-to-html converter for bold text
  const formatText = (text: string) => {
      return text.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={i}>{part.slice(1,-1)}</em>;
          }
          return part;
      });
  };

  return (
    <div className={`flex items-end gap-2 ${containerStyles} animate-fade-in-up`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-sky-blue flex items-center justify-center text-lg self-start shrink-0">
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
          <div className="whitespace-pre-wrap">{formatText(message.text)}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessageBubble;
