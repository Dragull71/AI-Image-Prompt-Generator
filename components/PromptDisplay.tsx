
import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

interface PromptDisplayProps {
  prompt: string;
}

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      setCopied(true);
    }
  };

  return (
    <div className="relative p-4 bg-gray-900/50 rounded-lg border border-border-color min-h-[12rem] flex items-center justify-center">
      {prompt ? (
        <>
          <p className="text-text-secondary text-sm leading-relaxed">{prompt}</p>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 hover:bg-brand-primary transition-colors duration-200"
            aria-label="Copy prompt"
          >
            {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5 text-text-secondary" />}
          </button>
        </>
      ) : (
        <p className="text-text-secondary/60">Your generated prompt will appear here...</p>
      )}
    </div>
  );
};
