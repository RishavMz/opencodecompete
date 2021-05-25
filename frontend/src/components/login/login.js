import React, { Component } from 'react';
import './login.css';
import axios from 'axios';

class Login extends Component {
    constructor() {
        super();
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.setCookie = this.setCookie.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);

        this.state = {
            loggedIn : false ,
            username: "",
            password: "",
            remember: false
        }

    }
    
    // Utility function to set cookie
    setCookie(name, value, days) {
        var expires = "";
          var date = new Date();
          date.setTime(date.getTime() + (31536000000));
          expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/;SameSite=Lax";
      }

    componentDidMount(){

        // Display which server the application is currently using
        axios.get(`http://127.0.0.1:5000/`,{
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            console.error(error);
        })

        // Check if session available
        axios.get(`http://127.0.0.1:5000/auth/remember`,{
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then(res => {
            const prefix = res.data.substring(0,3);
            const payload = res.data.substring(3);
            if(prefix === "200") {
                this.setState({loggedIn : true });
                console.log(res.data);
                this.props.loggedIn(true);
            }
            else{
                console.log(payload);
                this.props.loggedIn(false);
            }
        })
        .catch(error => {
            console.error(error);
        })
        if(this.state.loggedIn === false){

            // If session unavailable, check if valid cookie available
            const loginCookie = document.cookie.substring(document.cookie.indexOf("login=200")+9);
            if(loginCookie){
                axios.post(`http://127.0.0.1:5000/auth/remember`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    username: loginCookie
                }, {withCredentials: true })
                .then(res => {
                    const prefix = res.data.substring(0,3);
                    const payload = res.data.substring(3);
                    if(prefix === "200") {
                        this.setState({loggedIn : true });
                        console.log(res.data);
                        this.props.loggedIn(true);
                    }
                    else{
                        console.log(payload);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            }
        }
    }


    handleLogIn = (key) => {
        key.preventDefault();
        if(this.state.username === "" || this.state.password === ""){
            alert("Username or password cannot be empty");
            return;
        }
        // Try to log in
        axios.post(`http://127.0.0.1:5000/auth/login`,
        {
            headers: {
                 'Content-Type': 'application/json'
            },
            username: this.state.username,
            password: this.state.password,
            remember: this.state.remember 
        }, {withCredentials: true })
        .then(res => {
            const prefix = res.data.substring(0,3);
            const payload = res.data.substring(3);
            if(prefix === "200") {

                // Create the login cookie with value as username
                this.setCookie("login", res.data, ( 86400*365 ) );
                this.setState({loggedIn : true });
                console.log(res.data);
                this.props.loggedIn(true);
            }
            else{
                console.log(payload);
                this.props.loggedIn(false);
                alert("Incorrect username and password");
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    handleLogOut = (key) => {
        key.preventDefault();

        // Try to Log out 
        axios.post(`http://127.0.0.1:5000/auth/logout`,{
            headers: {
                'Content-Type': 'application/json'
           } 
        }, {withCredentials: true })
        .then(res => {
                this.setState({loggedIn : false });

                // Remove the login cookie value
                this.setCookie("login", "", 0 );
                console.log("Logged out");
                this.props.loggedIn(false);
            })
        .catch(error => {
            console.error(error);
        })
    }

    // Handle state change for input fields for react
    changeHandler = (key) => {
        this.setState({
            [key.target.name] : key.target.value
        });
    }

    // Handle checkbox
    toggleCheckbox = (key) => {
        let value = (this.state.is_checked === "on" || this.state.is_checked === true) ? false : true;
        this.setState({remember: value});
      }

    render() { 

        let output = "";
        if(this.state.loggedIn === false) {
            output = <div className = "login" >
                <form onSubmit = {this.handleLogIn}>
                <label className = "signinLabel" >Username</label>
                <input className = "logininput" type = "text" name = "username"  onChange = {this.changeHandler } value = {this.state.username}/>
                <label className = "signinLabel" >Password</label>
                <input className = "logininput" type = "password" name = "password"  onChange = {this.changeHandler} value = {this.state.password}/>
                <label className = "signinLabel" >Remember Me</label>
                <input className = "logininput" type = "checkbox" name = "remember" checked={this.state.is_checked} onChange={this.toggleCheckbox.bind(this)}/>
                <button className = "loginbutton" type="submit">LOG IN</button>
                </form>
            </div>
        } else {
            output = <div className = "login" >
                <form onSubmit = {this.handleLogOut}>
                <button className = "loginbutton" type="submit">LOG OUT</button>
                </form>
            </div>
        }
        return ( <div className = "navbar">
            {output}
        </div> );
    }
}
 
export default Login;