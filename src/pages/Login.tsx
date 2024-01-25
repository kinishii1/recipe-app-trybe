import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoApp from '../images/logo-app.png';
import bgImg from '../images/bg-img.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateInput = () => {
      const regex = /\S+@\S+\.\S+/;
      const validTest = regex.test(email) && password.length > 6;
      setIsValid(validTest);
    };

    validateInput();
  }, [email, password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;
    if (type === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/meals');
  };

  return (
    <div className="login-container">
      <img className="logo" src={ logoApp } alt="" />
      <img className="bg-img" src={ bgImg } alt="" />
      <form
        data-testid="login-form"
        onSubmit={ (e) => handleSubmit(e) }
      >
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => handleChange(e) }
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => handleChange(e) }
        />
        <button disabled={ !isValid } data-testid="login-submit-btn">
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
