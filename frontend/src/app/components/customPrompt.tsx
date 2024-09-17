'use client'

import { useState } from "react";

interface CustomPromptProps {
    message: string;
    onConfirm: (input: string) => void;
    onCancel: () => void; // Correctly typing the onCancel function
  }
  
  const CustomPrompt: React.FC<CustomPromptProps> = ({ message, onConfirm, onCancel }) => {
    const [inputValue, setInputValue] = useState('');
  
    const handleConfirm = () => {
      onConfirm(inputValue);
    };
  
    return (
      <div className="modal">
        <p>{message}</p>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button onClick={handleConfirm}>OK</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  }

  export default CustomPrompt
