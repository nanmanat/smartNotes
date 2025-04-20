import React from 'react';

function Navbar({ onPageChange }) {
  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-xl font-bold cursor-pointer" 
          onClick={() => onPageChange('home')}
        >
          Smart Notes
        </h1>
        <div>
          <button 
            className="p-2 hover:bg-indigo-700 rounded"
            onClick={() => onPageChange('privacy')}
          >
            Settings
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;