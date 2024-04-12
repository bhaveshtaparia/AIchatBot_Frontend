import React  from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './component/Login/LoginPage';
import SignupPage from './component/SignUp/SignupPage';
import Chat from './component/Chat/Chat';
import Admin from './component/admin/Admin';

function App() {
 
  return (
    <>
   <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<Chat/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </Router>
   </>
  );
}

export default App;