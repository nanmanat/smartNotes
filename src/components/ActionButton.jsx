import React from 'react';

function ActionButton({ onClick, color, children }) {
  const colorClasses = {
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    gray: 'bg-gray-300 hover:bg-gray-400 text-gray-800'
  };

  return (
    <button 
      onClick={onClick}
      className={`${colorClasses[color] || colorClasses.blue} text-white py-3 px-4 rounded-lg font-medium`}
    >
      {children}
    </button>
  );
}

export default ActionButton;