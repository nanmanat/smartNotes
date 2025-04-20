import React, { useState } from 'react';

function TodoItem({ text }) {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="flex items-center py-3 group transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg px-2">
      <div className="relative mr-3">
        <input 
          type="checkbox" 
          checked={completed}
          onChange={() => setCompleted(!completed)}
          className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-violet-600 dark:text-violet-500 focus:ring-violet-500 dark:focus:ring-violet-400 transition-colors"
        />
        {completed && (
          <svg 
            className="absolute top-0 left-0 h-5 w-5 text-violet-600 dark:text-violet-400 pointer-events-none" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        )}
      </div>
      <span className={`${completed ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-700 dark:text-slate-300"} transition-colors duration-200`}>
        {text}
      </span>
    </div>
  );
}

export default TodoItem;
