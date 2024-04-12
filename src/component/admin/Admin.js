import React, { useState } from 'react';
import './admin.css'
import uri from '../../uri';
function Admin() {
  // State to store uploaded file
  const [uploadedFile, setUploadedFile] = useState(null);

  // Function to handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    try {
      // Create FormData object to send the file
      const formData = new FormData();
      formData.append('csvFile', file);
  
      // Send file to backend for processing using Fetch
      
      const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: formData
      };
      const response = await fetch(`${uri}/api/v1/upload`, requestOptions,{ withCredentials: true });
      const result = await response.json();
      if (response.ok) {
        // If upload is successful, set uploaded file in state
        setUploadedFile(file);
        alert('File uploaded successfully');
      } else {
          console.log(response)
        throw new Error('Failed to upload file');
      }
    } catch (error) {
      // Handle any errors that occur during the upload process
      console.error('Error uploading file:', error);
      alert('Error uploading file: ' + error.message);
    }
  };
  

  // Function to handle downloading CSV file for monitoring chatbot results
  const handleDownloadMonitoringCSV = () => {
    // Implement logic to download CSV file
  };

  // Function to handle downloading CSV file for sales team
  const handleDownloadSalesCSV = () => {
    // Implement logic to download CSV file
  };

  // Function to handle viewing user-AI conversation transcripts
  const handleViewTranscripts = () => {
    // Implement logic to fetch conversation transcripts from server
  };

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Admin Panel</h2>
      <div className="file-upload-wrapper">
        <label htmlFor="fileUpload" className="file-upload-label">Upload CSV file to train our chatbot:</label>
        <input type="file" id="fileUpload" className="file-upload-input" accept=".csv" onChange={handleFileUpload} />
      </div>
      <div className="button-wrapper">
        <button onClick={handleDownloadMonitoringCSV}>Download CSV file for monitoring chatbot results</button>
      </div>
      <div className="button-wrapper">
        <button onClick={handleDownloadSalesCSV}>Download CSV file for sales team</button>
      </div>
      <div className="button-wrapper">
        <button onClick={handleViewTranscripts}>View User-AI conversation transcripts</button>
      </div>
    </div>
  );
}

export default Admin;
