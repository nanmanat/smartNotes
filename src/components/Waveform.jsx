import React from 'react';

function Waveform({ data }) {
  return (
    <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center p-4 mb-6">
      <div className="flex items-end w-full h-full space-x-1">
        {data.map((height, index) => (
          <div 
            key={index}
            className="bg-indigo-500 w-full"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default Waveform;