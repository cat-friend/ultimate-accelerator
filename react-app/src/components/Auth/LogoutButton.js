import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push("/")
  };

  return <NavLink onClick={(e) => onLogout(e)} to="#">LOGOUT</NavLink>;
};

export default LogoutButton;
