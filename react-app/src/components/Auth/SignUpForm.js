import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([])
    return dispatch(signUp(username, email, password, repeatPassword))
      .then((response) => {
        if (response?.errors) {
          setErrors(response.errors)
          return
        }
        else if (!response?.errors) return;
      })
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
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
      <div className='content'>
        <form className='form' onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <input
            placeholder='Username'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            className='input'
          ></input>
          <input
            placeholder='Email'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            className='input'
          ></input>
          <input
            placeholder='Password'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            className='input'
          ></input>
          <input
            placeholder='Verify Password'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            className='input'
          ></input>
          <div className='form-button-container'>
            <button className='form-button' type='submit'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

export default SignUpForm;
