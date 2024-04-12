import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 
import {useDispatch, useSelector} from 'react-redux'
import uri from '../../uri';
import { login } from '../../actions/authAction';
const LoginPage = ({ history }) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const authenticated=useSelector(state=>state.auth.isAuthenticated);
  useEffect(()=>{
    if(authenticated){
     navigate('/');
    }
 },[authenticated,navigate])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      };
      const response = await fetch(`${uri}/api/v1/login`, requestOptions,{ withCredentials: true });
      const result = await response.json();
      if(response.ok){
        localStorage.setItem('auth',JSON.stringify(result));
        dispatch(login(result));
      }else{
        alert(result.message);

      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className='login-page'>
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;