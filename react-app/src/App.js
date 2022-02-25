import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar'
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CSSTester from './components/CSSTester';
import AddChallengeForm from './components/ChallengesForms/AddChallengeForm';
import Challenges from './components/Challenges';
import Auth from './components/Auth';
import Clans from './components/Clans';
import ClanPage from './components/ClanPage';
import Footer from './components/Footer';
import About from './components/About';
import Tutorial from "./components/Tutorial"

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (<>
    <nav><NavBar loaded={loaded} /></nav>
    <div className='root'>
      <Switch>
        <Route path='/' exact={true}>
          <Auth loaded={loaded} />
          <About loaded={loaded} />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/challenges' exact={true} >
          <Challenges />
        </ProtectedRoute>
        <ProtectedRoute path='/challenges' exact={true} >
          <AddChallengeForm />
        </ProtectedRoute>
        <ProtectedRoute path='/clans' exact={true} >
          <Clans />
        </ProtectedRoute>
        <ProtectedRoute path='/clans/:clanId' exact={true} >
          <ClanPage />
        </ProtectedRoute>
        <ProtectedRoute path='/tutorial' exact={true} >
          <Tutorial />
        </ProtectedRoute>
        <Route>
        </Route>
      </Switch>
    </div>
    <Footer />
  </>
  );
}

export default App;
