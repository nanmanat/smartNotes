import React, { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import ActionButton from '../components/ActionButton';
import { summariesByDate, formatDate } from '../mockData';

function DaySummaryPage({ onPageChange, pageParams }) {
  const [dayData, setDayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Find summaries for the selected date
    setIsLoading(true);
    setAnimateIn(false);

    if (pageParams.date) {
      // Simulate loading for better UX
      setTimeout(() => {
        const dateGroup = summariesByDate.find(group => group.date === pageParams.date);
        if (dateGroup) {
          setDayData(dateGroup);
        }
        setIsLoading(false);
        setTimeout(() => setAnimateIn(true), 100);
      }, 500);
    }
  }, [pageParams.date]);

  // Get color based on mode
  const getModeColor = (mode) => {
    switch(mode) {
      case 'personal': return 'violet';
      case 'classroom': return 'sky';
      case 'meeting': return 'rose';
      case 'pdf': return 'amber';
      default: return 'slate';
    }
  };

  // Get mode icon based on summary mode
  const getModeIcon = (mode) => {
    switch(mode) {
      case 'personal':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        );
      case 'classroom':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        );
      case 'meeting':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        );
      case 'pdf':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-violet-500 animate-spin"></div>
          <p className="mt-4 text-slate-500 dark:text-slate-400">Loading summaries...</p>
        </div>
      </div>
    );
  }

  // Get day and month for the date badge
  const dateObj = new Date(dayData.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'short' });

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className={`transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="mb-8 flex items-start">
          {/* Date badge */}
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 dark:from-violet-600 dark:to-indigo-700 text-white rounded-lg shadow-md flex flex-col items-center justify-center mr-4">
            <div className="text-xs font-medium uppercase">{month}</div>
            <div className="text-xl font-bold leading-none">{day}</div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
              {formatDate(dayData.date)}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {dayData.summaries.length} {dayData.summaries.length === 1 ? 'summary' : 'summaries'} • 
              {dayData.summaries.reduce((total, summary) => total + summary.keyPoints.length, 0)} key points
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {dayData.summaries.map((summary, summaryIndex) => {
            const modeColor = getModeColor(summary.mode);

            return (
              <div 
                key={summary.id} 
                className={`transition-all duration-500 delay-${summaryIndex * 100} ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <SummaryCard title={
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full bg-${modeColor}-100 dark:bg-${modeColor}-900/30 text-${modeColor}-600 dark:text-${modeColor}-400 flex items-center justify-center mr-2`}>
                      {getModeIcon(summary.mode)}
                    </div>
                    <span>{summary.title}</span>
                  </div>
                }>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">{summary.summary}</p>

                  <h4 className="font-medium mb-2 text-slate-900 dark:text-white">Key Points:</h4>
                  <ul className="space-y-2 pl-5 text-slate-700 dark:text-slate-300 mb-4">
                    {summary.keyPoints.map((point, index) => (
                      <li key={index} className="relative">
                        <span className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
                    <h4 className="font-medium mb-3 text-slate-900 dark:text-white flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                      </svg>
                      Voice Recording:
                    </h4>
                    <div className="flex items-center">
                      <button className={`bg-${modeColor}-100 hover:bg-${modeColor}-200 dark:bg-${modeColor}-900/20 dark:hover:bg-${modeColor}-900/30 text-${modeColor}-600 dark:text-${modeColor}-400 p-3 rounded-full transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <div className="ml-4 flex-1">
                        <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div className={`h-2 bg-${modeColor}-500 dark:bg-${modeColor}-400 rounded-full w-1/3`}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-slate-500 dark:text-slate-400">
                          <span>0:00</span>
                          <span>2:45</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SummaryCard>
              </div>
            );
          })}
        </div>

        {/* Add padding at the bottom to prevent content from being hidden behind fixed buttons */}
        <div className="pb-24"></div>
      </div>

      {/* Fixed buttons at the bottom of the screen */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 shadow-lg border-t border-slate-200 dark:border-slate-700 px-4 py-3 z-10">
        <div className="container mx-auto max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <ActionButton 
              onClick={() => onPageChange("home")}
              color="slate"
              variant="outline"
              size="compact"
              className="w-full"
              alwaysHover={true}
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"></path>
                </svg>
                Back to Home
              </div>
            </ActionButton>

            <ActionButton 
              onClick={() => onPageChange("todos", { date: dayData.date })}
              color="violet"
              size="compact"
              className="w-full"
              alwaysHover={true}
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                View Todos
              </div>
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DaySummaryPage;
