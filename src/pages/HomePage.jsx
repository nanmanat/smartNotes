import React, { useState, useEffect } from 'react';
import ModeSelector from '../components/ModeSelector';
import ActionButton from '../components/ActionButton';
import DayCard from '../components/DayCard';
import { summariesByDate } from '../mockData';

function HomePage({ onPageChange }) {
  const [selectedMode, setSelectedMode] = useState("personal");
  const [isLoading, setIsLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  // Simulate loading and animate in content
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setAnimateIn(true), 100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = (date) => {
    onPageChange("day-summary", { date });
  };

  const handleViewTodos = (date) => {
    onPageChange("todos", { date });
  };

  // Get color based on selected mode
  const getModeColor = (mode) => {
    switch(mode) {
      case 'personal': return 'violet';
      case 'classroom': return 'sky';
      case 'meeting': return 'rose';
      default: return 'slate';
    }
  };

  const selectedColor = getModeColor(selectedMode);

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className={`w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-${selectedColor}-500 animate-spin`}></div>
          <p className="mt-4 text-slate-500 dark:text-slate-400">กำลังโหลดบันทึกของคุณ...</p>
        </div>
      ) : (
        <div className={`transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

          <ModeSelector 
            selectedMode={selectedMode} 
            setSelectedMode={setSelectedMode} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <ActionButton 
              onClick={() => onPageChange("record", { mode: selectedMode })}
              color={selectedColor}
              size="lg"
              className="w-full"
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
                เริ่มการบันทึก
              </div>
            </ActionButton>

            <ActionButton 
              onClick={() => onPageChange("upload")}
              color="slate"
              variant="outline"
              size="lg"
              className="w-full"
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                อัปโหลด PDF
              </div>
            </ActionButton>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">สรุปล่าสุด</h2>
            <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              ดูทั้งหมด
            </button>
          </div>

          <div className="space-y-6">
            {summariesByDate.map((dateGroup, index) => (
              <div 
                key={dateGroup.date}
                className={`transition-all duration-500 delay-${index * 100} ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <DayCard 
                  date={dateGroup.date}
                  summaries={dateGroup.summaries}
                  onViewDetails={handleViewDetails}
                  onViewTodos={handleViewTodos}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
