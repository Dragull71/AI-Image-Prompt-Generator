
export const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      const mimeType = result.split(':')[1].split(';')[0];
      if (base64 && mimeType) {
        resolve({ base64, mimeType });
      } else {
        reject(new Error("Failed to parse base64 string from file."));
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
