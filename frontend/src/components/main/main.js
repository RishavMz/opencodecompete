import React, { Component } from 'react';
import Navbar from './navbar/navbar';
import Feed from './feed/feed';
import Profile from './profile/profile';
import Contribution from './contribution/contribution';
import NotFound from './notfound/notfound';
import Answer from './answer/answer';
import Blogview from './blogview/blogview';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import './main.css';

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
                    <Route path = "/answer/:slug" exact component = {Answer}/>
                    <Route path = "/blogview/:slug" exact component = {Blogview}/>
                    <Route path="/" component={NotFound} />
                </Switch>
            </Router>

        </div> );
    }
}
 
export default Main;