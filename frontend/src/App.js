import Main from './components/main/main'
import Auth from './components/auth/auth'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path = "/" exact component = {Main}/>
          <Route path = "/login" exact component = {Auth}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;