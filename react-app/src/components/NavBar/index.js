import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from './logo.svg'
import "./NavBar.css"
import LogoutButton from '../Auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const isQT = sessionUser?.id === 5;

  return (
    <>
      {sessionUser ?
        (
          <>
            <div className="nav-link">
              <NavLink to={`/users/${sessionUser.id}`}><h1>hi, {sessionUser.username} :]</h1></NavLink>
              {isQT && <p>sup qt 3.14</p>}
            </div>
            <div className="nav-link">
              <NavLink to={"/tutorial"}>TUTORIAL</NavLink>
            </div>
            <div className="nav-link">
              <NavLink to={`/users/${sessionUser.id}/challenges`}>BATTLE PASS CHALLENGES</NavLink>
            </div>
            <div className="nav-link">
              <NavLink to="/clans">CLANS</NavLink>
            </div>
            <div className="nav-link">
              <LogoutButton />
            </div>
          </>
        ) :
        (<>
          <div className="nav-link"></div>
          <div className="nav-link"></div>
          <div className="nav-link"></div>
          <div className="nav-link"></div>
          <div className="nav-link"></div>
        </>)
      }
      {/* <div id="left-icon">
        </div> */}
      {/* <div id="icon">
          <img src={logo} id="logo" />
        </div> */}
      <NavLink to="/"><img src={logo} id="logo" alt="Ultimate Accelerator logo that, when clicked, redirects user to the splash page" /></NavLink>
    </>)
}
export default NavBar;
