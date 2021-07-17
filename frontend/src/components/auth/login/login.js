import React, { Component } from 'react';
import './login.css';
import axios from 'axios';


const HOST = process.env.REACT_APP_APIHOST;

class Login extends Component {
    constructor() {
        super();
        this.handleLogIn = this.handleLogIn.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.setCookie = this.setCookie.bind(this);

        this.state = {
            loggedIn : false ,
            username: "",
            password: "",
        };

    }
    
    // Utility function to set cookie
    setCookie(name, value, days) {
        var expires = "";
          var date = new Date();
          date.setTime(date.getTime() + (31536000000));
          expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/;SameSite=Lax";
      }

    async componentDidMount(){

        // Check if session available
        await axios.get(`${HOST}auth/remember`,{
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
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
        .catch((error) => {
            console.error(error);
        })
        if(this.state.loggedIn === false){

            // If session unavailable, check if valid cookie available
            const loginCookie = document.cookie.substring(document.cookie.indexOf("login=200")+9);
            if(loginCookie){
                await axios.post(`${HOST}/auth/remember`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    username: loginCookie
                }, {withCredentials: true })
                .then((res) => {
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
                .catch((error) => {
                    console.error(error);
                });
            }
        }
    }


    handleLogIn = async(key) => {
        key.preventDefault();
        if(this.state.username === "" || this.state.password === ""){
            this.props.message("Username or password cannot be empty");
            return;
        }
        // Try to log in
        await axios.post(`${HOST}/auth/login`,
        {
            headers: {
                 'Content-Type': 'application/json'
            },
            username: this.state.username,
            password: this.state.password,
        }, {withCredentials: true })
        .then((res) => {
            const prefix = res.data.substring(0,3);
            const payload = res.data.substring(3);
            if(prefix === "200") {

                // Create the login cookie with value as username
                this.setCookie("login", res.data, ( 86400*365 ) );
                this.setState({loggedIn : true });
                this.props.loggedIn(true);
                //this.props.message("Successfully logged In");
                window.location.reload();

            }
            else{
                console.log(payload);
                this.props.loggedIn(false);
                this.props.message("Incorrect username or password");
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }


    // Handle state change for input fields for react
    changeHandler = (key) => {
        this.setState({
            [key.target.name] : key.target.value
        });
    }


    render() { 
        return ( <div className = "loginbar">
            <div className = "login" >
                <form onSubmit = {this.handleLogIn}>
                <label className = "signinLabel llabel1" >Username</label>
                <input className = "logininput linput1" type = "text" name = "username"  onChange = {this.changeHandler } value = {this.state.username}/>
                <label className = "signinLabel llabel2" >Password</label>
                <input className = "logininput linput2" type = "password" name = "password"  onChange = {this.changeHandler} value = {this.state.password}/>
                <button className = "loginbutton" type="submit">LOG IN</button>
                </form>
            </div>
        </div> );
    }
}
 
export default Login;