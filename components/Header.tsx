
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-light via-white to-brand-light mb-2">
        AI Image Prompt Generator
      </h1>
      <p className="text-lg text-text-secondary max-w-2xl mx-auto">
        Turn your pictures into powerful, descriptive prompts for AI image generation.
      </p>
    </header>
  );
};
