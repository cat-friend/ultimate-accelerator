import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar'
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UsersList from './components/UsersList';
import { authenticate } from './store/session';
import AddChallengeForm from './components/ChallengesForms/AddChallengeForm';
import Challenges from './components/Challenges';
import Auth from './components/Auth';
import Clans from './components/Clans';
import ClanPage from './components/ClanPage';
import Footer from './components/Footer';
import About from './components/About';
import Tutorial from "./components/Tutorial"
import UltimateAccelerator from './components/UltimateAccelerator';
import UserPage from './components/UserPage';
import Denise from './components/Denise';

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
    <nav><NavBar /></nav>
    <Switch>
      <Route path='/' exact={true}>
        <div id='root'>
          <Auth loaded={loaded} />
        </div>
        <About loaded={loaded} />
      </Route>
      <ProtectedRoute path='/users' exact={true} >
        <div id='root'>
          <UsersList />
        </div>
      </ProtectedRoute>
      <ProtectedRoute path='/users/:userId/challenges' exact={true} >
        <div id='root'>
          <Challenges />
        </div>
      </ProtectedRoute>
      <ProtectedRoute path='/challenges' exact={true} >
        <div id='root'>
          <AddChallengeForm />
        </div>
      </ProtectedRoute>
      <ProtectedRoute path='/clans' exact={true} >
        <div id='root'>
          <Clans />
        </div>
      </ProtectedRoute>
      <ProtectedRoute path='/clans/:clanId' exact={true} >
        <div id='root'>
          <ClanPage />
        </div>
      </ProtectedRoute>
      <ProtectedRoute path='/tutorial' exact={true} >
        <div id='root'>
          <Tutorial />
        </div>
      </ProtectedRoute>
      <ProtectedRoute path='/accelerate/:userId' exact={true} >
        <div id='root'>
          <UltimateAccelerator />
        </div>
      </ProtectedRoute>
      <ProtectedRoute path="/users/:userId" exact={true}>
        <div id="root">
          <UserPage />
        </div>
      </ProtectedRoute>
      <Route path="/denise" exact={true}>
        <div id="root">
          <Denise />
        </div>
      </Route>
      <Route>
      </Route>
    </Switch>
    <Footer />
  </>
  );
}

export default App;
