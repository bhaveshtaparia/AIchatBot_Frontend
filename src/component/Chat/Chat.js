import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import uri from '../../uri';
import { logout } from '../../actions/authAction';
import dislikeIcon from '../../images/dislike.png';
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
    const [isAIResponding, setIsAIResponding] = useState(false);
    const [isInputBlocked, setIsInputBlocked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [questionCount, setQuestionCount] = useState(0);
    const [selectedRating, setSelectedRating] = useState(null);
  
    const handleMessageSend = async () => {
      if (inputValue.trim() === '') return;
  
      setIsInputBlocked(true);
      const newUserMessage = { sender: 'user', text: inputValue };
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      setIsAIResponding(true);
  
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ question: inputValue })
        };
        const response = await fetch(`${uri}/api/v1/chat`, requestOptions, { withCredentials: true });
        const data = await response.json();
        const newChatbotMessage = { sender: 'chatbot', text: data.answer };
        setMessages(prevMessages => [...prevMessages, newChatbotMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsAIResponding(false);
        setIsInputBlocked(false);
        setInputValue('');
        setQuestionCount(prevCount => prevCount + 1);
      }
    };
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleDislike = async (answer, question) => {
      if (!disliked) {
        setDisliked(true);
      }
    };
  
    const handleFeedback = async (rating) => {
      alert(rating);
      setSelectedRating(rating);
     
      setQuestionCount(0);
    };
  
    return (
      <>
        <div className='chat'>
          <div className='navbar'>
            <div>
              <h1>Chat With Career</h1>
            </div>
            <div>
              {user && user.role === "admin" ? <button onClick={() => navigate('/admin')}>Admin</button> : <></>}
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className='chatbox'>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            {!isAIResponding && messages.length > 0 && (
              <div className={`dislike-icon ${disliked ? 'disliked' : ''}`} onClick={() => handleDislike(messages[messages.length - 1].text, messages[messages.length - 2].text)}>
                <img src={dislikeIcon} alt="Dislike" />
              </div>
            )}
            {isAIResponding && <div className="loading-indicator">Responding...</div>}
          </div>
          <div className='input-container'>
            <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Type your message..." disabled={isAIResponding || isInputBlocked} />
            <button onClick={handleMessageSend} disabled={isAIResponding || isInputBlocked}>Send</button>
          </div>
        </div>
        {questionCount >= 5 && (
          <div className="feedback-prompt">
            <p>Please provide your feedback: </p>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} onClick={() => handleFeedback(star)} className={selectedRating && selectedRating >= star ? 'active' : ''}>⭐</span>
              ))}
            </div>
          </div>
        )}
      </>
    )
  }
  
  export default Chat;
  