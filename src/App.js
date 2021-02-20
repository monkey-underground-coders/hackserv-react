import './App.css';
import Checkout from './modules/UserForm/Checkout'
import Dashboard from './modules/Dashboard/Dashboard'
import SignUpPage from './modules/SignUpInPage/SignUpPage'
import SignInPage from './modules/SignUpInPage/SignInPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user/create" component={SignUpPage} />
        <Route path="/user/login" component={SignInPage} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
