import React from 'react';

function ActionButton({ onClick, color, children, className = '', size = 'md', variant = 'filled', alwaysHover = false }) {
  // Modern color palette
  const colorVariants = {
    filled: {
      red: 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white shadow-sm hover:shadow-md dark:bg-rose-600 dark:hover:bg-rose-700 dark:active:bg-rose-800',
      blue: 'bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white shadow-sm hover:shadow-md dark:bg-sky-600 dark:hover:bg-sky-700 dark:active:bg-sky-800',
      green: 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-sm hover:shadow-md dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:active:bg-emerald-800',
      yellow: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white shadow-sm hover:shadow-md dark:bg-amber-600 dark:hover:bg-amber-700 dark:active:bg-amber-800',
      gray: 'bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-800 shadow-sm hover:shadow-md dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500 dark:text-white',
      violet: 'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white shadow-sm hover:shadow-md dark:bg-violet-600 dark:hover:bg-violet-700 dark:active:bg-violet-800',
    },
    outline: {
      red: 'border-2 border-rose-500 text-rose-600 hover:bg-rose-50 active:bg-rose-100 dark:text-rose-400 dark:border-rose-400 dark:hover:bg-rose-900/30 dark:active:bg-rose-900/50',
      blue: 'border-2 border-sky-500 text-sky-600 hover:bg-sky-50 active:bg-sky-100 dark:text-sky-400 dark:border-sky-400 dark:hover:bg-sky-900/30 dark:active:bg-sky-900/50',
      green: 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-emerald-900/30 dark:active:bg-emerald-900/50',
      yellow: 'border-2 border-amber-500 text-amber-600 hover:bg-amber-50 active:bg-amber-100 dark:text-amber-400 dark:border-amber-400 dark:hover:bg-amber-900/30 dark:active:bg-amber-900/50',
      gray: 'border-2 border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700',
      violet: 'border-2 border-violet-500 text-violet-600 hover:bg-violet-50 active:bg-violet-100 dark:text-violet-400 dark:border-violet-400 dark:hover:bg-violet-900/30 dark:active:bg-violet-900/50',
    },
    ghost: {
      red: 'text-rose-600 hover:bg-rose-50 active:bg-rose-100 dark:text-rose-400 dark:hover:bg-rose-900/30 dark:active:bg-rose-900/50',
      blue: 'text-sky-600 hover:bg-sky-50 active:bg-sky-100 dark:text-sky-400 dark:hover:bg-sky-900/30 dark:active:bg-sky-900/50',
      green: 'text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-900/30 dark:active:bg-emerald-900/50',
      yellow: 'text-amber-600 hover:bg-amber-50 active:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/30 dark:active:bg-amber-900/50',
      gray: 'text-slate-700 hover:bg-slate-50 active:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700',
      violet: 'text-violet-600 hover:bg-violet-50 active:bg-violet-100 dark:text-violet-400 dark:hover:bg-violet-900/30 dark:active:bg-violet-900/50',
    }
  };

  // Size variants
  const sizeClasses = {
    sm: 'py-1 px-3 text-xs rounded-lg',
    md: 'py-2 px-4 text-sm rounded-lg',
    compact: 'py-1.5 px-3 text-sm rounded-lg',
    lg: 'py-2.5 px-5 text-base rounded-xl',
    xl: 'py-3 px-6 text-lg rounded-xl'
  };

  // Get the appropriate color classes based on variant and color
  let colorClass = colorVariants[variant]?.[color] || colorVariants.filled.blue;
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  // Apply hover styles permanently if alwaysHover is true
  if (alwaysHover) {
    // For filled variant
    if (variant === 'filled') {
      colorClass = colorClass
        .replace('bg-rose-500', 'bg-rose-600').replace('dark:bg-rose-600', 'dark:bg-rose-700')
        .replace('bg-sky-500', 'bg-sky-600').replace('dark:bg-sky-600', 'dark:bg-sky-700')
        .replace('bg-emerald-500', 'bg-emerald-600').replace('dark:bg-emerald-600', 'dark:bg-emerald-700')
        .replace('bg-amber-500', 'bg-amber-600').replace('dark:bg-amber-600', 'dark:bg-amber-700')
        .replace('bg-slate-200', 'bg-slate-300').replace('dark:bg-slate-700', 'dark:bg-slate-600')
        .replace('bg-violet-500', 'bg-violet-600').replace('dark:bg-violet-600', 'dark:bg-violet-700')
        .replace('shadow-sm', 'shadow-md');
    }
    // For outline variant
    else if (variant === 'outline') {
      colorClass = colorClass
        .replace('hover:bg-rose-50', 'bg-rose-50').replace('dark:hover:bg-rose-900/30', 'dark:bg-rose-900/30')
        .replace('hover:bg-sky-50', 'bg-sky-50').replace('dark:hover:bg-sky-900/30', 'dark:bg-sky-900/30')
        .replace('hover:bg-emerald-50', 'bg-emerald-50').replace('dark:hover:bg-emerald-900/30', 'dark:bg-emerald-900/30')
        .replace('hover:bg-amber-50', 'bg-amber-50').replace('dark:hover:bg-amber-900/30', 'dark:bg-amber-900/30')
        .replace('hover:bg-slate-50', 'bg-slate-50').replace('dark:hover:bg-slate-800', 'dark:bg-slate-800')
        .replace('hover:bg-violet-50', 'bg-violet-50').replace('dark:hover:bg-violet-900/30', 'dark:bg-violet-900/30');
    }
    // For ghost variant
    else if (variant === 'ghost') {
      colorClass = colorClass
        .replace('hover:bg-rose-50', 'bg-rose-50').replace('dark:hover:bg-rose-900/30', 'dark:bg-rose-900/30')
        .replace('hover:bg-sky-50', 'bg-sky-50').replace('dark:hover:bg-sky-900/30', 'dark:bg-sky-900/30')
        .replace('hover:bg-emerald-50', 'bg-emerald-50').replace('dark:hover:bg-emerald-900/30', 'dark:bg-emerald-900/30')
        .replace('hover:bg-amber-50', 'bg-amber-50').replace('dark:hover:bg-amber-900/30', 'dark:bg-amber-900/30')
        .replace('hover:bg-slate-50', 'bg-slate-50').replace('dark:hover:bg-slate-800', 'dark:bg-slate-800')
        .replace('hover:bg-violet-50', 'bg-violet-50').replace('dark:hover:bg-violet-900/30', 'dark:bg-violet-900/30');
    }
  }

  return (
    <button 
      onClick={onClick}
      className={`
        ${colorClass} 
        ${sizeClass} 
        font-medium transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 
        ${variant === 'filled' ? `focus:ring-${color === 'gray' ? 'slate' : color}-500` : `focus:ring-${color === 'gray' ? 'slate' : color}-400`}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default ActionButton;
