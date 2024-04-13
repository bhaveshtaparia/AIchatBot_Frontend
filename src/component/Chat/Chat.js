import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import uri from '../../uri';
import { logout } from '../../actions/authAction';
import './chat.css'
function Chat() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const authenticated=useSelector(state=>state.auth.isAuthenticated);
  const user=useSelector(state=>state.auth && state.auth.user && state.auth.user.user);
  useEffect(()=>{
    if(!authenticated){
     navigate('/login');
    }
 },[authenticated,navigate])

 // logout function 
 const handleLogout=async()=>{
    try {
      const requestOptions = {
        method: 'GET',
        credentials: 'include'
      };
      const response = await fetch(`${uri}/api/v1/logout`, requestOptions);
      const result = await response.json();
      if (response.ok) {
        localStorage.removeItem('auth');
        dispatch(logout());
        navigate('/login');
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert(err);
    }
  };


  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleMessageSend = async () => {
    if (inputValue.trim() === '') return; // Ignore empty messages

    // Add user message to chat messages
    setMessages([...messages, { sender: 'user', text: inputValue }]);

    // Send user message to backend
    try {
     
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ question: inputValue }) 
      };
      const response = await fetch(`${uri}/api/v1/chat`, requestOptions,{ withCredentials: true });
      const data = await response.json();
      // Add chatbot response to chat messages
      setMessages([...messages, { sender: 'chatbot', text: data.answer }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    // Clear input field
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className='navbar'>
        <div>
    <h1>Chat With Career</h1>
        </div>
  <div>
  {user && user.role==="admin"?<button onClick={()=>navigate('/admin')}>Admin</button>:<></>}
    <button onClick={handleLogout}>Logout</button>
  </div>
    </div>
    <div className='chat'>
    <div className='chatbox'>
    {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className='input-container'>
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Type your message..." />
          <button onClick={handleMessageSend}>Send</button>
        </div>
    </div>
    </>
  )
}

export default Chat