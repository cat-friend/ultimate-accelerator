import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const demoLogin = () => {
    const email = 'demo@aa.io';
    const password = 'password';
    return dispatch(login(email, password));
  }

  // const onLogin = async (e) => {
  //   e.preventDefault();
  //   const data = await dispatch(login(email, password));
  //   if (data) {
  //     setErrors(data);
  //   }
  // };

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login(email, password)).then((response) => {
      if (response?.errors) {
        setErrors(response.errors);
        setEmail("");
        setPassword("");
        return;
      }
    });
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (<>
    <div className='header-parent'>
      <div className="left-corner-b"></div>
      <div className="header-child-b">
        <h2>Log In</h2>
      </div>
      <div className="right-corner-b"></div>
    </div>
    <div className="content-container">
      <div className='auth-content'>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className="errors">{error}</div>
            ))}
          </div>
          <div>
            <input
              className='input'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className='input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='button-div'>
              <button type='submit'>Login</button>
              <button type='button' onClick={() => demoLogin()}>Demo</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

export default LoginForm;
