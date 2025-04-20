import React from 'react';

function ModeSelector({ selectedMode, setSelectedMode }) {
  const modes = [
    { id: 'personal', label: 'Personal', description: 'For individual note-taking' },
    { id: 'classroom', label: 'Classroom', description: 'For lectures and classes' },
    { id: 'meeting', label: 'Meeting', description: 'For work meetings and discussions' }
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Select Mode</h3>
      
      <div className="space-y-3">
        {modes.map((mode) => (
          <div className="flex items-center" key={mode.id}>
            <input 
              type="radio" 
              id={mode.id} 
              name="mode" 
              value={mode.id}
              checked={selectedMode === mode.id}
              onChange={() => setSelectedMode(mode.id)}
              className="mr-2"
            />
            <label htmlFor={mode.id} className="flex-1">
              <div className="font-medium">{mode.label}</div>
              <div className="text-sm text-gray-500">{mode.description}</div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModeSelector;