import React, { useState } from 'react';
import ModeSelector from '../components/ModeSelector';
import ActionButton from '../components/ActionButton';

function HomePage({ onPageChange }) {
  const [selectedMode, setSelectedMode] = useState("personal");

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold text-center my-6">Welcome to Smart Notes</h2>
      
      <ModeSelector 
        selectedMode={selectedMode} 
        setSelectedMode={setSelectedMode} 
      />
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <ActionButton 
            onClick={() => onPageChange("record", { mode: selectedMode })}
            color="red"
          >
            Start Recording
          </ActionButton>
        </div>
        
        <div className="flex-1">
          <ActionButton 
            onClick={() => onPageChange("upload")}
            color="blue"
          >
            Upload PDF
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export default HomePage;