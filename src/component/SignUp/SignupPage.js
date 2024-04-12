import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import './SignUp.css';
import { signup } from '../../actions/authAction';
import uri from '../../uri';
const SignupPage = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const authenticated=useSelector(state=>state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  useEffect(()=>{
     if(authenticated){
      navigate('/');
     }
  },[authenticated,navigate])

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
      
      const response = await fetch(`${uri}/api/v1/register`, requestOptions);
      const result = await response.json();
      if(response.ok){
        // alert(result.message);
        localStorage.setItem('auth',JSON.stringify(result));
        dispatch(signup(result));
      }else{
        alert(result.message);
      }
    } catch (err) {
      alert(err);
    }
    // Redirect to login page after signup
  };

  return (
    <div className='signup-page'> 
      <div className="auth-container">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">UserName:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;