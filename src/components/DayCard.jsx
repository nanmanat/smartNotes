import React from 'react';
import ActionButton from './ActionButton';
import { formatDate } from '../mockData';

function DayCard({ date, summaries, onViewDetails, onViewTodos }) {
  // Get day and month for the date badge
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('th-TH', { month: 'short',  });

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

  // Get color based on summary mode
  const getModeColor = (mode) => {
    switch(mode) {
      case 'personal': return 'violet';
      case 'classroom': return 'sky';
      case 'meeting': return 'rose';
      case 'pdf': return 'amber';
      default: return 'slate';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md hover:shadow-lg rounded-xl p-5 mb-6 border border-slate-100 dark:border-slate-700 transition-all duration-200">
      <div className="flex items-start mb-4">
        {/* Date badge */}
        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 dark:from-violet-600 dark:to-indigo-700 text-white rounded-lg shadow-md flex flex-col items-center justify-center mr-4">
          <div className="text-xs font-medium uppercase">{month}</div>
          <div className="text-xl font-bold leading-none">{day}</div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{formatDate(date)}</h3>
          <div className="flex items-center">
            <span className="text-xs text-slate-500 dark:text-slate-400">{summaries.length} {summaries.length === 1 ? 'บทสรุป' : 'บทสรุป'}</span>
            <span className="mx-2 text-slate-300 dark:text-slate-600">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {summaries.reduce((total, summary) => total + summary.keyPoints.length, 0)} ประเด็นสำคัญ
            </span>
          </div>
        </div>

        <ActionButton 
          onClick={() => onViewTodos(date)}
          color="violet"
          variant="outline"
          size="sm"
          className="flex-shrink-0"
        >
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            สิ่งที่ต้องทำ
          </div>
        </ActionButton>
      </div>

      <div className="space-y-4 mb-4">
        {summaries.map(summary => {
          const modeColor = getModeColor(summary.mode);

          return (
            <div key={summary.id} className="border border-slate-100 dark:border-slate-700 rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center mb-2">
                <div className={`w-6 h-6 rounded-full bg-${modeColor}-100 dark:bg-${modeColor}-900/30 text-${modeColor}-600 dark:text-${modeColor}-400 flex items-center justify-center mr-2`}>
                  {getModeIcon(summary.mode)}
                </div>
                <h4 className="font-medium text-slate-900 dark:text-white">{summary.title}</h4>
              </div>

              <ul className="space-y-1 pl-8 mb-2">
                {summary.keyPoints.map((point, index) => (
                  <li key={index} className="text-sm text-slate-700 dark:text-slate-300 relative">
                    <span className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <ActionButton 
          onClick={() => onViewDetails(date)}
          color="slate"
          variant="ghost"
          size="md"
        >
          <div className="flex items-center">
            <span>ดูบทสรุปเต็ม</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </div>
        </ActionButton>
      </div>
    </div>
  );
}

export default DayCard;
