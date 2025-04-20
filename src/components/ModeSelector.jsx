import React, { useState, useRef, useEffect } from 'react';

function ModeSelector({ selectedMode, setSelectedMode }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const dropdownRef = useRef(null);

  const modes = [
    { 
      id: 'personal', 
      label: 'ส่วนตัว', 
      description: 'สำหรับการจดบันทึกส่วนบุคคล',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      )
    },
    { 
      id: 'classroom', 
      label: 'ห้องเรียน', 
      description: 'สำหรับการบรรยายและชั้นเรียน',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      )
    },
    { 
      id: 'meeting', 
      label: 'การประชุม', 
      description: 'สำหรับการประชุมงานและการสนทนา',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleModeSelect = (modeId) => {
    setSelectedMode(modeId);
    setIsMenuVisible(false);
  };

  // Find the currently selected mode to display its label and icon
  const currentMode = modes.find(mode => mode.id === selectedMode);

  // Get the appropriate color for the selected mode
  const getModeColor = (modeId) => {
    switch(modeId) {
      case 'personal': return 'violet';
      case 'classroom': return 'sky';
      case 'meeting': return 'rose';
      default: return 'slate';
    }
  };

  const selectedColor = getModeColor(selectedMode);

  return (
    <div className="relative mb-6" ref={dropdownRef}>
      <button 
        onClick={toggleMenu}
        className={`
          w-full flex items-center justify-between 
          bg-white dark:bg-slate-800 
          border border-slate-200 dark:border-slate-700
          shadow-sm hover:shadow-md 
          rounded-xl p-4 
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-${selectedColor}-500 focus:ring-opacity-50
        `}
      >
        <div className="flex items-center">
          <div className={`
            flex-shrink-0 w-8 h-8 mr-3 
            rounded-full 
            flex items-center justify-center 
            bg-${selectedColor}-100 dark:bg-${selectedColor}-900/30
            text-${selectedColor}-600 dark:text-${selectedColor}-400
          `}>
            {currentMode?.icon}
          </div>
          <div>
            <div className="font-medium text-slate-900 dark:text-white">{currentMode ? currentMode.label : 'เลือกโหมด'}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{currentMode?.description}</div>
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isMenuVisible ? 'transform rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div className={`
        absolute z-10 w-full mt-2 
        bg-white dark:bg-slate-800 
        shadow-lg rounded-xl 
        overflow-hidden 
        transition-all duration-300 origin-top
        border border-slate-200 dark:border-slate-700
        ${isMenuVisible ? 'opacity-100 scale-100 max-h-96' : 'opacity-0 scale-95 max-h-0 pointer-events-none'}
      `}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">เลือกโหมด</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">เลือกวิธีที่คุณต้องการใช้ Smart Notes</p>
        </div>
        <div className="p-2">
          {modes.map((mode) => {
            const modeColor = getModeColor(mode.id);
            const isSelected = selectedMode === mode.id;

            return (
              <div 
                key={mode.id}
                onClick={() => handleModeSelect(mode.id)}
                className={`
                  flex items-center p-3 rounded-lg cursor-pointer
                  transition-colors duration-200
                  ${isSelected 
                    ? `bg-${modeColor}-50 dark:bg-${modeColor}-900/20` 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}
                `}
              >
                <div className={`
                  flex-shrink-0 w-10 h-10 mr-3 
                  rounded-full 
                  flex items-center justify-center 
                  ${isSelected 
                    ? `bg-${modeColor}-100 dark:bg-${modeColor}-900/30 text-${modeColor}-600 dark:text-${modeColor}-400` 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}
                `}>
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${isSelected ? `text-${modeColor}-700 dark:text-${modeColor}-400` : 'text-slate-900 dark:text-white'}`}>
                    {mode.label}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {mode.description}
                  </div>
                </div>
                {isSelected && (
                  <svg className={`w-5 h-5 text-${modeColor}-600 dark:text-${modeColor}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ModeSelector;
