import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoLogin = () => {
    const email = 'demo@aa.io';
    const password = 'password';
    return dispatch(login(email, password));
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([])
    return dispatch(signUp(username, email, password, repeatPassword))
      .then((response) => {
        if (response?.errors) {
          setErrors(response.errors);
          response.errors.forEach((ele) => {
            console.log("ele", ele);
            if (ele.includes("Username")) setUsername("");
            if (ele.includes("address")) setEmail("");
          });
          setPassword("");
          setRepeatPassword("");
          errors.forEach((ele) => {
            console.log("ele", ele);
            if (ele.includes("Username")) setUsername("");
            if (ele.includes("address")) setEmail("");
          });
          return
        }
        else if (!response?.errors) return;
      })
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (<>
    <div className='header-parent'>
      <div className="left-corner"></div>
      <div className="header-child"><h2>Sign Up</h2></div>
      <div className="right-corner"></div>
    </div>
    <div className='content-container'>
      <div className='auth-content'>
        <form className='form' onSubmit={(e) => onSignUp(e)}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className="errors">{error}</div>
            ))}
          </div>
          <input
            placeholder='Username'
            type='text'
            name='username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className='input'>
          </input>
          <input
            placeholder='Email'
            type='text'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='input'>
          </input>
          <input
            placeholder='Password'
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='input'>
          </input>
          <input
            placeholder='Verify Password'
            type='password'
            name='repeat_password'
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            required={true}
            className='input'>
          </input>
          <div className='button-div'>
            <button className='form-button' type='submit'>Sign Up</button>
            <button type='button' onClick={() => demoLogin}>Demo</button>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

export default SignUpForm;
