import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RecordPage from './pages/RecordPage';
import UploadPage from './pages/UploadPage';
import SummaryPage from './pages/SummaryPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});

  const handlePageChange = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
  };

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
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onPageChange={handlePageChange} />
      <div className="py-4">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;