import { useState, useEffect } from 'react';
// Import the actual method or function from extract-colors
import { extractColors } from 'extract-colors';  // Make sure to adjust the import based on its actual export

/**
 * Custom hook to extract colors from an image.
 * @param {string} imageUrl - The URL of the image to extract colors from.
 * @returns {Array} colors - The array of extracted colors.
 */
const useImageColorExtractor = (imageUrl: string) => {
    
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        // Call the extractColors function with the image URL
        // console.log(imageUrl)
        const extractedColors = await extractColors(imageUrl);
        // Map and store the hex colors

        console.log(extractColors)
        setColors(extractedColors.map(color => color.hex));
      } catch (error) {
        console.error('Error extracting colors:', error);
      }
    };

    fetchColors();
  }, [imageUrl]);

  return { colors };
};

export default useImageColorExtractor;
