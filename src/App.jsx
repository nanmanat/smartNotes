import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RecordPage from './pages/RecordPage';
import UploadPage from './pages/UploadPage';
import SummaryPage from './pages/SummaryPage';
import PrivacyPage from './pages/PrivacyPage';
import DaySummaryPage from './pages/DaySummaryPage';
import TodosPage from './pages/TodosPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  const [pageTransition, setPageTransition] = useState(false);

  const handlePageChange = (page, params = {}) => {
    setPageTransition(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageParams(params);
      setPageTransition(false);
    }, 300);
  };

  useEffect(() => {
    // Add smooth scrolling to the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'record':
        return <RecordPage onPageChange={handlePageChange} pageParams={pageParams} />;
      case 'upload':
        return <UploadPage onPageChange={handlePageChange} />;
      case 'summary':
        return <SummaryPage onPageChange={handlePageChange} pageParams={pageParams} />;
      case 'privacy':
        return <PrivacyPage onPageChange={handlePageChange} />;
      case 'day-summary':
        return <DaySummaryPage onPageChange={handlePageChange} pageParams={pageParams} />;
      case 'todos':
        return <TodosPage onPageChange={handlePageChange} pageParams={pageParams} />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar onPageChange={handlePageChange} />
      <div className={`py-4 pt-20 transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
