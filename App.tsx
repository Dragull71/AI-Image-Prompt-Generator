
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptDisplay } from './components/PromptDisplay';
import { Loader } from './components/Loader';
import { generatePromptFromImage } from './services/geminiService';
import { fileToBase64 } from './utils/imageUtils';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setGeneratedPrompt('');
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGeneratePrompt = useCallback(async () => {
    if (!selectedImage) {
      setError('Please select an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const { base64, mimeType } = await fileToBase64(selectedImage);
      const prompt = await generatePromptFromImage(base64, mimeType);
      setGeneratedPrompt(prompt);
    } catch (err) {
      console.error(err);
      setError('Failed to generate prompt. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-bg-light rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col space-y-6">
              <ImageUploader onImageSelect={handleImageSelect} imageUrl={imageUrl} />
              <button
                onClick={handleGeneratePrompt}
                disabled={!selectedImage || isLoading}
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {isLoading ? 'Generating...' : '✨ Generate Prompt'}
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-semibold text-text-primary">Generated Prompt</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-48 bg-gray-900/50 rounded-lg">
                  <Loader />
                </div>
              ) : error ? (
                <div className="p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-lg">
                  <p className="font-semibold">An Error Occurred</p>
                  <p className="text-sm">{error}</p>
                </div>
              ) : (
                <PromptDisplay prompt={generatedPrompt} />
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-text-secondary/50 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
