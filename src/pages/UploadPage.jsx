import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import ActionButton from '../components/ActionButton';

function UploadPage({ onPageChange }) {
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (selectedFile) {
      onPageChange("summary", { mode: "pdf" });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold text-center my-6">Upload PDF</h2>
      
      <FileUploader
        selectedFile={selectedFile}
        onFileChange={handleFileChange}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <ActionButton 
          onClick={() => onPageChange("home")}
          color="gray"
        >
          Cancel
        </ActionButton>
        
        <ActionButton 
          onClick={handleUpload}
          color="blue"
          disabled={!selectedFile}
        >
          Process PDF
        </ActionButton>
      </div>
    </div>
  );
}

export default UploadPage;