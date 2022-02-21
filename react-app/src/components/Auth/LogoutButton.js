import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { NavLink, Redirect } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    <Redirect to='/' />
  };

  return <NavLink onClick={(e) => onLogout(e)} to="#">Logout</NavLink>;
};

export default LogoutButton;
