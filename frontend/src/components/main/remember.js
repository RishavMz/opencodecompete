import React, { Component } from 'react';
import Navbar from './navbar/navbar';
import Feed from './feed/feed';
import Profile from './profile/profile';
import Contribution from './contribution/contribution';
import NotFound from './notfound/notfound';
import Answer from './answer/answer';
import Blogview from './blogview/blogview';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Footer from "./footer/footer";
import './main.css';
import axios from 'axios'
import pikachu from './pikachu.gif';
import grass from './grass.png';

const HOST = process.env.REACT_APP_APIHOST;

class Main extends Component {
    constructor(){
        super();
        this.state = {
            grass:[]
        }
        this.setCookie = this.setCookie.bind(this);
    }

    setCookie(name, value, days) {
        var expires = "";
          var date = new Date();
          date.setTime(date.getTime() + (31536000000));
          expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/;SameSite=Lax";
      }
    async componentDidMount(){

        var grasses = window.screen.width/100;
        var gras = [];
        for(var i=0; i<grasses; i++)
            gras.push(i);
        this.setState({grass: gras});
        // That mysterious bug
        await axios.post(`${HOST}/auth/checklogout`,{
            headers: {
                'Content-Type': 'application/json'
           } 
        }, {withCredentials: true })
        .then(async(resp) => {
            if(resp.data.data === undefined ){
                alert("Session Lost Mysteriously")
                await axios.post(`${HOST}/auth/logout`,{
                    headers: {
                        'Content-Type': 'application/json'
                   } 
                }, {withCredentials: true })
                .then(() => {
                        this.setState({loggedIn : false });

                        // Remove the login cookie value
                        this.setCookie("login", "", 0 );
                        console.log(document.cookie);
                        window.location = "http://localhost:3000/login"
                    })
                .catch(error => {
                    console.error(error);
                })
            }
        })
        .catch(error => {
            console.error(error);
        })
    }
    render() { 
        
        return ( <div className = "main">
            <div className = "banner">
                <div className="pokeball1"/>
                <div className="pokeball2"/>


            <img className="pikachu" src={pikachu} alt="pikachu"/>
            {this.state.grass.map((g)=> {return(<img key={g} className= "grass" src={grass} alt="grass"/>)})}
            </div>
            
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
            <Footer/>
        </div> );
    }
}
 
export default Main;