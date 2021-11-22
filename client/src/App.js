import { useRoutes } from './routes';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Notification from './components/Main/Notification'
import { useAuth } from './components/hooks/auth.hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticatedAction } from './store/Auth/actions';
import { useEffect } from 'react';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { token } = useAuth();
  const routes = useRoutes(auth.isAuthenticated);

  useEffect(() => {
    dispatch(setIsAuthenticatedAction(!!token));
  }, [token, dispatch])

  return (
    <Router>
      <div className="App">
        {routes}
      </div>
      <Notification />
    </Router>
  );
}

export default App;
