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

  return (
    <>
    <div className='chat'>
      <div className='navbar'>
        <div>
    <h1>Chat With Career</h1>
        </div>
  <div>
  {user && user.role==="admin"?<button onClick={()=>navigate('/admin')}>Admin</button>:<></>}
    <button onClick={handleLogout}>Logout</button>
  </div>
    </div>
    <div className='chatbox'>
       
    </div>

      </div>
    </>
  )
}

export default Chat