import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from './logo.svg'
import "./NavBar.css"
import LogoutButton from '../Auth/LogoutButton';

const NavBar = ({ loaded }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {sessionUser &&
        (
          <>
            <div className='nav-link'>
            </div>
            <div className="nav-link">
              <NavLink to={`/users/${sessionUser.id}`}><h1>hi, {sessionUser.username} :)</h1></NavLink>
            </div>
            <div className="nav-link">
              HOW-TO
            </div>
            <div className="nav-link">
              <NavLink to={`/users/${sessionUser.id}/challenges`}>BATTLEPASS CHALLENGES</NavLink>
            </div>
            <div className="nav-link">
              <NavLink to="/clans">CLANS</NavLink>
            </div>
            <div className="nav-link">
              <LogoutButton />
            </div>
          </>
        )
      }
      <div className="icon-container">
        <div id="left-icon">
        </div>
        <div id="icon">
          <img src={logo} id="logo" />
        </div>
      </div>
    </>)
}
export default NavBar;
