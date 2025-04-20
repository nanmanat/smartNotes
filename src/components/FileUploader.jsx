import React from 'react';

function FileUploader({ selectedFile, onFileChange }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 block cursor-pointer">
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={onFileChange}
        />
        
        {!selectedFile ? (
          <>
            <div className="mb-4 text-gray-500">
              <svg className="mx-auto h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 mb-2">Click to browse or drag and drop</p>
            <p className="text-xs text-gray-400">PDF files only</p>
          </>
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 font-medium">{selectedFile.name}</p>
            <p className="text-sm text-gray-500">{Math.round(selectedFile.size / 1024)} KB</p>
          </div>
        )}
      </label>
    </div>
  );
}

export default FileUploader;