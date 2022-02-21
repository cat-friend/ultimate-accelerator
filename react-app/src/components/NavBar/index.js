import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from './logo.svg'
import "./NavBar.css"
import LogoutButton from '../Auth/LogoutButton';

const NavBar = ({ loaded }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  return (<>
    <div className="nav-container">{sessionUser &&
      (
        <>
          <NavLink to={`/users/${sessionUser.id}`}><h1>hi, {sessionUser.username} :)</h1></NavLink>
          <div className="">
            HOW-TO
          </div>
          <div className="">
            <NavLink to={`/users/${sessionUser.id}/challenges`}>BATTLEPASS CHALLENGES</NavLink>
          </div>
          <div className="">
            <NavLink to="/clans">CLANS</NavLink>
          </div>
          <div>
            <LogoutButton />
          </div>
        </>
      )
    }
    </div>
    <div className="icon-container">
      <div id="left-icon">
      </div>
      <div id="icon">
        <img src={logo} id="logo" />
      </div>
    </div>
  </>
  );
}

export default NavBar;
