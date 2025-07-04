import React from 'react';
import Card from './Card';
import { X } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <Card 
        className="relative w-full max-w-lg animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside card
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-dark-text transition">
          <X size={24} />
        </button>
        {children}
      </Card>
    </div>
  );
};

export default Modal;
