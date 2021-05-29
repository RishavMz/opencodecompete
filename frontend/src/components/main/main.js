import React, { Component } from 'react';
import Navbar from './navbar/navbar';
import Feed from './feed/feed';
import Profile from './profile/profile';
import Contribution from './contribution/contribution';
import NotFound from './notfound/notfound';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'

class Main extends Component {
    state = {  }
    render() { 
        return ( <div className = "main">
            <Router>
                <Navbar/>
                <Switch>
                    <Route path = "/" exact component = {Feed}/>
                    <Route path = "/profile" exact component = {Profile}/>
                    <Route path = "/contribution" exact component = {Contribution}/>
                    <Route path="/" component={NotFound} />
                </Switch>
            </Router>

        </div> );
    }
}
 
export default Main;