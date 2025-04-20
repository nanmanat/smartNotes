import React, { useState, useEffect } from 'react';

function Navbar({ onPageChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`fixed top-0 w-full z-20 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg text-slate-800 dark:text-white' 
        : 'bg-transparent text-slate-800 dark:text-white'
    }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 
          className="text-2xl font-extrabold cursor-pointer tracking-tight hover:text-violet-600 dark:hover:text-violet-400 transition-colors" 
          onClick={() => onPageChange('home')}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
            Smart Notes
          </span>
        </h1>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={toggleMenu}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            className="px-4 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => onPageChange('home')}
          >
            Home
          </button>
          <button 
            className="px-4 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => onPageChange('privacy')}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute w-full bg-white dark:bg-slate-900 shadow-lg transition-all duration-300 overflow-hidden ${
        menuOpen ? 'max-h-60 py-2' : 'max-h-0'
      }`}>
        <div className="container mx-auto px-4">
          <button 
            className="block w-full text-left py-3 px-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => {
              onPageChange('home');
              setMenuOpen(false);
            }}
          >
            Home
          </button>
          <button 
            className="block w-full text-left py-3 px-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => {
              onPageChange('privacy');
              setMenuOpen(false);
            }}
          >
            Settings
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
