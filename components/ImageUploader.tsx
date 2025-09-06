
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  imageUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className="relative w-full aspect-square bg-gray-900/50 rounded-lg border-2 border-dashed border-border-color flex flex-col justify-center items-center text-center p-4 cursor-pointer transition-colors duration-300 hover:border-brand-primary"
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {imageUrl ? (
        <img src={imageUrl} alt="Selected preview" className="max-w-full max-h-full object-contain rounded-md" />
      ) : (
        <div className="flex flex-col items-center text-text-secondary">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="font-semibold">Click to upload an image</p>
          <p className="text-xs">PNG, JPG, or WEBP</p>
        </div>
      )}
    </div>
  );
};
