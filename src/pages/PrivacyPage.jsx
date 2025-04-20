import React, { useState } from 'react';
import ActionButton from '../components/ActionButton';

function PrivacyPage({ onPageChange }) {
  const [settings, setSettings] = useState({
    anonymizeVoices: true,
    storeRecordings: false,
    allowTranscriptSharing: false,
    enableAIAnalysis: true
  });
  
  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold text-center my-6">Privacy Settings</h2>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
                <div className="text-sm text-gray-500">
                  {getSettingDescription(key)}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={value}
                  onChange={() => handleToggle(key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Always be mindful of privacy and consent when recording conversations. Make sure all participants are aware they're being recorded.
            </p>
          </div>
        </div>
      </div>
      
      <ActionButton 
        onClick={() => onPageChange("home")}
        color="blue"
      >
        Save Settings
      </ActionButton>
    </div>
  );
}

// Helper function for privacy settings descriptions
function getSettingDescription(setting) {
  const descriptions = {
    anonymizeVoices: "Alter voices to prevent identification of speakers",
    storeRecordings: "Keep original audio files after processing",
    allowTranscriptSharing: "Enable sharing features for generated transcripts",
    enableAIAnalysis: "Use AI to generate summaries and action items"
  };
  
  return descriptions[setting] || "";
}

export default PrivacyPage;