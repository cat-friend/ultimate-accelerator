import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CSSTester from './components/CSSTester';
import AddChallengeForm from './components/ChallengesForms/AddChallengeForm';
import Challenges from './components/Challenges';

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
        <ProtectedRoute path='/' exact={true} >
        </ProtectedRoute>
        <Route path='/login' exact={true}>
          <LoginForm />
          <h1>Hello?</h1>
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
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
      </Switch>
    </div>
  </>
  );
}

export default App;
