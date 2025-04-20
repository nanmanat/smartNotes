import React from 'react';

function SummaryCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-md hover:shadow-lg rounded-xl p-6 mb-4 border border-slate-100 dark:border-slate-700 transition-all duration-200">
      <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">{title}</h3>
      {children}
    </div>
  );
}

export default SummaryCard;
