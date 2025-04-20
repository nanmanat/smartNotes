import React, { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import ActionButton from '../components/ActionButton';
import { summariesByDate, formatDate } from '../mockData';

function TodosPage({ onPageChange, pageParams }) {
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Find todos for the selected date
    if (pageParams.date) {
      setIsLoading(true);
      const dateGroup = summariesByDate.find(group => group.date === pageParams.date);
      if (dateGroup) {
        // Collect all todos from all summaries for this date
        const allTodos = [];
        dateGroup.summaries.forEach(summary => {
          summary.todoItems.forEach(todoText => {
            allTodos.push({
              id: `${summary.id}-${allTodos.length}`,
              text: todoText,
              summaryTitle: summary.title,
              mode: summary.mode
            });
          });
        });

        // Simulate loading for better UX
        setTimeout(() => {
          setTodos(allTodos);
          setDate(dateGroup.date);
          setIsLoading(false);
          setTimeout(() => setAnimateIn(true), 100);
        }, 500);
      } else {
        setIsLoading(false);
      }
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

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-violet-500 animate-spin"></div>
          <p className="mt-4 text-slate-500 dark:text-slate-400">Loading your todos...</p>
        </div>
      ) : (
        <div className={`transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Todos for {date ? formatDate(date) : ''}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {todos.length} {todos.length === 1 ? 'task' : 'tasks'} to complete
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 shadow-md hover:shadow-lg rounded-xl p-6 mb-6 border border-slate-100 dark:border-slate-700 transition-all duration-200">
            {todos.length > 0 ? (
              <div className="space-y-1">
                {todos.map((todo, index) => (
                  <div 
                    key={todo.id} 
                    className={`transition-all duration-500 delay-${index * 50} ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  >
                    <div className="flex items-center mb-1">
                      <div className={`w-3 h-3 rounded-full bg-${getModeColor(todo.mode)}-400 dark:bg-${getModeColor(todo.mode)}-500 mr-2`}></div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{todo.summaryTitle}</div>
                    </div>
                    <TodoItem text={todo.text} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <svg className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <p className="text-center text-slate-500 dark:text-slate-400">No todos found for this date.</p>
              </div>
            )}
          </div>

          {/* Add padding at the bottom to prevent content from being hidden behind fixed buttons */}
          <div className="pb-24"></div>
        </div>
      )}
      {/* Fixed buttons at the bottom of the screen - only show when not loading */}
      {!isLoading && (
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
                onClick={() => onPageChange("day-summary", { date })}
                color="violet"
                size="compact"
                className="w-full"
                alwaysHover={true}
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  View Summaries
                </div>
              </ActionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodosPage;
