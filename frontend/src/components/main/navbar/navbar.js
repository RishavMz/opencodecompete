import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './navbar.css'
;
class Navbar extends Component {
    constructor(){
        super();
        this.handleLogOut = this.handleLogOut.bind(this);
        this.setCookie = this.setCookie.bind(this);
        this.handleTheme = this.handleTheme.bind(this);
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

    handleTheme = (e) => {
        var blogfeed = document.getElementById("theme1");
        var all, i;
        if(this.state.theme === "light"){
            document.getElementById("main").classList.remove("lighttheme");
            document.getElementById("main").classList.add("darktheme");
            if(blogfeed){
                document.getElementById("theme1").classList.remove("lighttheme");
                document.getElementById("theme1").classList.add("darktheme");
                document.getElementById("theme2").classList.remove("lighttheme");
                document.getElementById("theme2").classList.add("darktheme");
                all = document.getElementsByClassName("feedseperate");
                for(i=0; i<all.length; i++){
                    document.getElementsByClassName("feedseperate")[i].style.color = "white";
                }
            }
            this.setState({theme: "dark"});
        } else {
            document.getElementById("main").classList.remove("darktheme");
            document.getElementById("main").classList.add("lighttheme");
            this.setState({theme: "light"})
            if(blogfeed){
                document.getElementById("theme1").classList.add("lighttheme");
                document.getElementById("theme1").classList.remove("darktheme");
                document.getElementById("theme2").classList.add("lighttheme");
                document.getElementById("theme2").classList.remove("darktheme");
                all = document.getElementsByClassName("feedseperate");
                for(i=0; i<all.length; i++){
                    document.getElementsByClassName("feedseperate")[i].style.color = "black";
                }
            }
        }
        console.log(this.state)
    }  


    handleLogOut = async(key) => {
        key.preventDefault();

        // Try to Log out 
        await axios.post(`http://localhost:5000/auth/logout`,{
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
                <div  className = "theme">
                <label className="switch">
                    <input type="checkbox" onChange = {this.handleTheme}/>
                    <span className="slider round"></span>
                </label>
                </div>
            <Link className = "navlink" to = "/login" onClick = {this.handleLogOut}>
                Log Out
            </Link>
            <Link className = "navlink" to = "/profile">
                Profile
            </Link>
            <Link className = "navlink" to = "/contribution">
                Contribute
            </Link>
            <Link className = "navlink" to = "/">
                Home
            </Link>
        </div>);
    }
}
 
export default Navbar;