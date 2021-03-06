import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './navbar.css';

const HOST = process.env.REACT_APP_APIHOST;

class Navbar extends Component {
    constructor(){
        super();
        this.handleLogOut = this.handleLogOut.bind(this);
        this.setCookie = this.setCookie.bind(this);
        this.state = {
            theme: "light"
        };
    }


    setCookie(name, value, days) {
        var expires = "";
          var date = new Date();
          date.setTime(date.getTime() + (31536000000));
          expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/;SameSite=Lax";
      }

    handleLogOut = async(key) => {
        key.preventDefault();

        // Try to Log out 
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
            })
        .catch(error => {
            console.error(error);
        })
        window.location.reload();
    }

    render() { 
        return ( <div className = "navbar">
            <Link className = "navlink" to = "/login" onClick = {this.handleLogOut}>
                Log Out
            </Link>
            <Link className = "navlink" to = "/profile">
                Profile
            </Link>
            <Link className = "navlink" to = "/contribution">
                Contribute
            </Link>
            <Link className = "navlink" to = "/" >
                Home
            </Link>
        </div>);
    }
}
 
export default Navbar;