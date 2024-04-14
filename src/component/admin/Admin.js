import React, { useEffect, useState } from 'react';
import './admin.css'
import uri from '../../uri';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
function Admin() {
  // State to store uploaded file
  const navigate=useNavigate();

  const authenticated=useSelector(state=>state.auth.isAuthenticated);
  const user=useSelector(state=>state.auth && state.auth.user && state.auth.user.user);
  useEffect(()=>{
    if(!authenticated){
     navigate('/login');
    }
    if(!user || user.role!=="admin"){
      navigate('/');
    }
 },[authenticated,navigate,user])


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
  const handleDownloadMonitoringCSV = async() => {
    try {
      // Fetch feedback data from the backend
      const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'text/csv',
      },
      };
      const response = await fetch(`${uri}/api/v1/download/perfomance`, requestOptions,{ withCredentials: true });
      const blob = await response.blob();

      // Create URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'feedback.csv');
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CSV file:', error);
      // Handle error
    }
  };

  // Function to handle downloading CSV file for sales team
  const handleDownloadSalesCSV = async () => {
    try {
        
      const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'text/csv',
      },
      };
      const response = await fetch(`${uri}/api/v1/download/salesTeamData`, requestOptions,{ withCredentials: true });
      const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        // Create link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sales_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading sales CSV file:', error);
    }
};



  const handleUnresolvedQestion = async() => {
    try {
        
      const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'text/csv',
      },
      };
      const response = await fetch(`${uri}/api/v1/download/doubt`, requestOptions,{ withCredentials: true });
      const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'doubts.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading sales CSV file:', error);
    }
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
        <button onClick={handleUnresolvedQestion}>Unresolved Question</button>
      </div>
      <div className="button-wrapper">
        <button onClick={()=>(navigate('/'))}>Home</button>
      </div>
    </div>
  );
}

export default Admin;
