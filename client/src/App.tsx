import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context } from './context/Context';
import Topbar from './components/Topbar';
import Login from './views/Login';
import Register from './views/Register';
import Settings from './views/Settings';
import Write from './views/Write';
import Home from './views/Home';
import Single from './views/Single';
import './styles/global.scss';

function App() {
  const { user } = useContext(Context);
  return (
    <>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/write">
          {user ? <Write /> : <Redirect to="/register" />}
        </Route>
        <Route path="/settings">
          {user ? <Settings /> : <Redirect to="/register" />}
        </Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
        <Register />
      </Switch>
    </>
  );
}

export default App;
