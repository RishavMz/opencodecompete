import Main from './components/main/main'
import Auth from './components/auth/auth'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {

  const loginCookie = document.cookie.substring(document.cookie.indexOf("login=200")+9);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path = "/" exact component = {Main}>
            {loginCookie === ""? <Redirect to = "/login"/> : null}
          </Route>
          <Route path = "/login" exact component = {Auth}>
          {loginCookie !== ""? <Redirect to = "/"/> : null}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;